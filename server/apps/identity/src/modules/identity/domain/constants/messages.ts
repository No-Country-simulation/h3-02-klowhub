import { AUTH } from 'sqlite3';

export const IDENTITY_VAL_ERRORS = {
  PASSWORD_INVALID:
    'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial',
  PASSWORD_LOWERCASE:
    'La contraseña debe contener al menos una letra minúscula.',
  PASSWORD_UPPERCASE:
    'La contraseña debe contener al menos una letra mayúscula.',
  PASSWORD_DIGIT: 'La contraseña debe contener al menos un número.',
  PASSWORD_SPECIAL:
    'La contraseña debe contener al menos un carácter especial.',
  PASSWORD_REQUIRED: 'La contraseña es obligatoria.',
  PASSWORD_LENGTH:
    'La contraseña debe tener al menos 8 caracteres y como maximo 40 caracteres.',
  EMAIL_INVALID: 'El correo electrónico es inválido.',
  EMAIL_REQUIRED: 'El correo electrónico es obligatorio.',
  EMAIL_LENGTH:
    'El correo electrónico debe tener al menos 5 caracteres y como maximo 255 caracteres.',
  NAME_REQUIRED: 'El nombre es obligatorio.',
  LASTNAME_REQUIRED: 'El apellido es obligatorio.',
  NAME_LENGTH:
    'El nombre debe tener al menos 1 caracter y como maximo 60 caracteres.',
  LASTNAME_LENGTH:
    'El apellido debe tener al menos 1 caracter y como maximo 60 caracteres.',
  CONFIRMATION_TOKEN_INVALID: 'El token de confirmación no es válido.',
};
export const IDENTITY_ERRORS = {
  USER_DUPLICATE: 'Ha ocurrido un error al registrar las credenciales.',
  USER_NOT_AUTHORIZE: 'No estás autorizado para acceder a esta ruta.',
  USER_TOKEN_EXPIRED: 'Tu token ha expirado.',
  USER_TOKEN_INVALID: 'Tu token no es válido.',
  USER_TOKEN_NOT_FOUND: 'Tu token no existe.',
  USER_INVALID_CREDENTIALS: 'Tus credenciales no son válidas.',
  USER_ID_MISMATCH:
    'Tu ID de usuario no coincide con el identificador de usuario.',
  AUTH_PROVIDER_ERROR: 'Error al crear el proveedor de autenticación',
  USER_PASSWORD_CHANGED: 'Tu contraseña ha sido cambiado',
  USER_UNCONFIRMED:
    'Verifica tu correo electronico, te hemos enviado un correo de confirmacion.',
  USER_ALREADY_CONFIRMED: 'Tu cuenta ya ha sido confirmada.',
  USER_UNEXPECTED: 'Ha ocurrido un error inesperado.',
};

export const IDENTITY_SUCCESS = {
  USER_CREATED:
    'Tu cuenta ha sido creada. Te hemos enviado un correo de confirmación.',
  USER_LOGIN: 'Te has logueado correctamente.',
  USER_UPDATED: 'Tu cuenta ha sido actualizada.',
  USER_DELETED: 'Tu cuenta ha sido eliminada.',
  USER_LOGOUT: 'Has cerrado sesión correctamente.',
};
