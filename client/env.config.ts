export interface EnvConfig {
  API_URL: string;
  APP_URL: string;
  NODE_ENV: string;
  VERCEL_ENV: string;
  VERCEL_PROJECT_PRODUCTION_URL: string;
  VERCEL_URL: string;
  NEXT_PUBLIC_CLIENT_ID:string;
}
const env: EnvConfig = {
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8080',
    NEXT_PUBLIC_CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID || '',
    NODE_ENV: process.env.NODE_ENV || 'development',
    VERCEL_ENV: process.env.VERCEL_ENV || '',
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL || '',
    VERCEL_URL: process.env.VERCEL_URL || '',
  };

/*export const {
  NEXT_PUBLIC_API_URL: API_URL = 'http://localhost:3000',
  NEXT_PUBLIC_APP_URL: APP_URL = "http://localhost:8080",
  NODE_ENV = "development",
  VERCEL_ENV = "",
  VERCEL_PROJECT_PRODUCTION_URL="",
  VERCEL_URL=""
} = process.env;*/

export default env;
