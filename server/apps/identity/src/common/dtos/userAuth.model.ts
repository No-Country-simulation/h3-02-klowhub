import { UUID } from "crypto";

export class UserAuth {
  readonly userId: UUID;
  readonly email: string;
}