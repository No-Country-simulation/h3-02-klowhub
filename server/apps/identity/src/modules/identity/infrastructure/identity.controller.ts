import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { IdentityService } from '../domain/ports/identity.service';

@Controller('v1/identity')
export class IdentityController {
  constructor(private readonly service: IdentityService) {}

  @GrpcMethod('IdentityService', 'Signup')
  public async createUser(data: any) {
    const { email, password, name, lastname, origin } = data;
    return await this.service.signup(email, password, name, lastname, origin);
  }

  @GrpcMethod('IdentityService', 'Signin')
  public async signin(data: any): Promise<any> {
    const { email, password, origin } = data;
    const result = await this.service.signin(email, password, origin);
    return result;
  }

  @GrpcMethod('IdentityService', 'RefreshAccess')
  public async refreshAccess(data: any): Promise<any> {
    const token = data.token;
    const result = await this.service.refreshTokenAccess(token, data.origin);
    return result;
  }

  @GrpcMethod('IdentityService', 'VerifyToken')
  public async verifyToken(data: any): Promise<any> {
    const token = data.accessToken;
    const result = await this.service.verifyToken(token);
    return { isValid: result.isValid || false, id: result.id };
  }

  @GrpcMethod('IdentityService', 'Logout')
  public async logout(data: any): Promise<any> {
    const { token } = data;
    const result = await this.service.logout(token);
    return result;
  }

  @GrpcMethod('IdentityService', 'ConfirmEmail')
  public async confirmEmail(data: any): Promise<any> {
    const result = await this.service.confirmEmail(
      data.confirmationToken,
      data.origin,
    );
    return result;
  }
}
