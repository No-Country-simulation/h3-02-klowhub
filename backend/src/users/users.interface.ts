export interface User {
    id: number | undefined;
    name: string;
    email: string;
    password: string;
    phone: string;
    country: string | undefined;
    address?: string | undefined;
    city?: string | undefined;
    createdAT?: string | undefined;
  }