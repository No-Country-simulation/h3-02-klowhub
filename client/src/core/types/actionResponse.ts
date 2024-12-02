import type { UUID } from 'crypto';

export interface ActionResponse {
  traceId?: UUID;
  errors: Record<string, string>;
  status?: string;
}

export type OnSubmitType = (
  state: Awaited<ActionResponse | undefined>,
  payload: FormData
) => ActionResponse | undefined | Promise<ActionResponse | undefined>;

export type ApiErrorType = {
  error: string | object;
};

export type ApiResultType<T = unknown> = [ApiErrorType | undefined, T | undefined];
