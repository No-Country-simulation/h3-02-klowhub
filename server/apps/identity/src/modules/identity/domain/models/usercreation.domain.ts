import { Base } from "@common/dtos/base.domain";

export class UserCreation extends Base {
  email: string;
  name: string;
  lastname: string;
  password?: string;
}
