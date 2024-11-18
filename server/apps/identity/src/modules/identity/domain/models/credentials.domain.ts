export class Credentials {
  version: number;
  lastPassword?: string;
  passwordUpdatedAt: Date;
  updatedAt?: Date;

  constructor(isConfirmed = false) {
    this.version = isConfirmed ? 1 : 0;
    this.passwordUpdatedAt = new Date();
  }

  public updatePassword(password: string): void {
    this.version++;
    this.lastPassword = password;
    const now = new Date();
    this.passwordUpdatedAt = now;
    this.updatedAt = now;
  }

  public updateVersion(): void {
    this.version++;
    this.updatedAt = new Date();
  }
}
