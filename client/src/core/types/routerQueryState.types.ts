/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Dispatch, SetStateAction } from 'react';

export type SerializerFunction = (value: any) => string | undefined;
export type DeserializerFunction = (value: string) => any;
export type RouterQueryStateHookResponse<T> = [T, Dispatch<SetStateAction<T>>];
