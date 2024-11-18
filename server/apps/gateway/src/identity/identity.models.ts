import { Observable } from 'rxjs';

export class SignupResponse {
  success: boolean; 
  message: string; 
}

export class User {
  id?: string; 
  email?: string; 
  name?: string; 
  lastName?: string; 
}

export class SignupRequest {
  email: string; 
  password: string; 
  name: string; 
  lastname: string; 
  origin?: string; 
}

export class SigninRequest {
  email: string; 
  password: string; 
  origin: string; 
}

export class AuthResult {
  refreshToken: string; 
  accessToken: string; 
  user: User; 
}

export class RefreshRequest {
  refreshToken: string; 
  origin: string; 
}

export class LogoutRequest {
  refreshToken: string; 
}

export class LogoutResponse {
  success: boolean; 
  message: string; 
}
export class ConfirmEmailRequest {
  confirmationToken: string; 
  origin: string; 
}

export class VerrifyTokenRequest {
  accessToken: string; 
}

export class VerrifyTokenResponse {
  isValid: boolean;  
  id: string;
}

export abstract class IdentityService {
  abstract Signup(data: SignupRequest): Observable<SignupResponse>;
  abstract Signin(data: SigninRequest): Observable<AuthResult>;
  abstract RefreshAccess(data: RefreshRequest): Observable<AuthResult>;
  abstract Logout(data: LogoutRequest): Observable<LogoutResponse>;
  abstract ConfirmEmail(data: ConfirmEmailRequest): Observable<AuthResult>;
  abstract VerifyToken(data: VerrifyTokenRequest): Observable<VerrifyTokenResponse>;
}