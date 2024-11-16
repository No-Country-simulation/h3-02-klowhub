import { Observable } from 'rxjs';

export interface Empty {}

export interface HelloResponse {
  message: string; // Contiene el mensaje de respuesta
}

export interface UsersService {
  GetHello(request: Empty): Observable<HelloResponse>; // Método que corresponde a gRPC
}