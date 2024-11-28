/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSearchParams } from 'next/navigation';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { usePathname, useRouter } from '../lib/i18nRouting';

type SerializerFunction = (value: any) => string | undefined;
type DeserializerFunction = (value: string) => any;

interface Options {
  serializer?: SerializerFunction;
  deserializer?: DeserializerFunction;
}

export function useRouterQueryState<T>(
  name: string,
  defaultValue?: T,
  opts: Options = {}
): [T, Dispatch<SetStateAction<T>>] {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const serialize = (value: T): string | undefined => {
    if (opts.serializer) {
      return opts.serializer(value);
    }
    return value as string;
  };

  const deserialize = (value: string): T => {
    if (opts.deserializer) return opts.deserializer(value);

    if (typeof defaultValue === 'number') {
      const numValue = Number(value === '' ? 'NaN' : value);
      return isNaN(numValue) ? (defaultValue as T) : (numValue as T);
    }
    return value as T;
  };

  const [state, setState] = useState<T>(() => {
    const value = searchParams.get(name);
    return value ? deserialize(value) : (defaultValue as T);
  });

  /*useWatch(() => {
    const serializedState = serialize(state);
    const params = new URLSearchParams(searchParams);

    if (serializedState === undefined) {
      if (params.has(name)) {
        params.delete(name);
      }
    } else {
      params.set(name, serializedState);
    }
    const search = params.toString();
    const query = search ? `?${search}` : '';
    const url = `${pathname}${query}`;
    router.replace(url, { scroll: true });

  }, [state, name]);*/
  useEffect(() => {
    const value = searchParams.get(name);
    setState(value !== null ? deserialize(value) : (defaultValue as T));
  }, [searchParams, name]);

  useEffect(() => {
    const serializedState = serialize(state);
    const params = new URLSearchParams(searchParams);

    if (serializedState === undefined) {
      params.delete(name);
    } else {
      params.set(name, serializedState);
    }

    const search = params.toString();
    const query = search ? `?${search}` : '';
    const url = `${pathname}${query}`;

    router.replace(url, { scroll: true });
  }, [state, name, pathname]);

  return [state, setState];
}
