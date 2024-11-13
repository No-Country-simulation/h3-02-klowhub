import type { UUID } from 'crypto';

export interface ActionResponse {
  traceId: UUID;
  errors: Record<string, string>;
  status: string;
}

export type OnSubmitType = (
  state: Awaited<ActionResponse | undefined>,
  payload: FormData
) => ActionResponse | undefined | Promise<ActionResponse | undefined>;