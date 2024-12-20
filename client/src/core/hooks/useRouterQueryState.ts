import { useSearchParams } from 'next/navigation';
import { type IStringifyOptions, parse, stringify } from 'qs';
import { useCallback, useEffect, useState } from 'react';
import { equalsObj } from '@core/services/equality.service';
import type { DeserializerFunction, SerializerFunction } from '@core/models/routerQueryState.types';
import { usePathname, useRouter } from '../lib/i18nRouting';

interface Options {
  serializer?: SerializerFunction;
  deserializer?: DeserializerFunction;
}
const defaultQsConfig: IStringifyOptions = {
  allowDots: true,
  arrayFormat: 'indices',
  allowEmptyArrays: true,
};

export function useRouterQueryState<T>(
  name: string,
  defaultValue?: T,
  opts: Options = {}
): [T, (newState: T) => void] {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const defaultSerializer = useCallback((value: T): string => {
    if (value === undefined || value === null) return '';
    if (typeof value === 'object') {
      try {
        return stringify(value, defaultQsConfig);
      } catch (e) {
        console.error(e);
        return '';
      }
    }
    return String(value);
  }, []);
  const defaultDeserializer = useCallback(
    (value: string): T => {
      if (!value) return defaultValue as T;

      try {
        const decoded = parse(value, defaultQsConfig);
        return decoded as T;
      } catch (e) {
        console.error(e);
        // Si falla, intentamos otros tipos
        if (typeof defaultValue === 'number') {
          const numValue = Number(value);
          return (isNaN(numValue) ? defaultValue : numValue) as T;
        }
        return value as T;
      }
    },
    [defaultValue]
  );

  const serialize = opts.serializer || defaultSerializer;
  const deserialize = opts.deserializer || defaultDeserializer;

  const [state, setState] = useState<T>(() => {
    const value = searchParams.get(name);
    return value ? deserialize(value) : (defaultValue as T);
  });

  const updateUrl = useCallback(
    (newState: T) => {
      const params = new URLSearchParams(searchParams as unknown as URLSearchParams);
      const serializedState = serialize(newState);

      if (serializedState === undefined || serializedState === '') {
        params.delete(name);
      } else {
        params.set(name, serializedState);
      }

      const search = params.toString();
      const query = search ? `?${search}` : '';
      const url = `${pathname}${query}`;

      // Solo reemplaza la URL si cambia
      router.replace(url, { scroll: false });
    },
    [name, pathname, router, searchParams, serialize]
  );

  const setQueryState = useCallback(
    (newState: T) => {
      updateUrl(newState);
    },
    [updateUrl]
  );

  useEffect(() => {
    const value = searchParams.get(name);
    const newState = value ? deserialize(value) : (defaultValue as T);
    if (!equalsObj(state, newState || {})) {
      setState(newState);
    }
  }, [name, searchParams, defaultValue, state]);

  return [state, setQueryState];
}
