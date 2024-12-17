export interface EnvConfig {
  API_URL: string;
  APP_URL: string;
  NODE_ENV: string;
}
const env: EnvConfig = {
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8080',
    NODE_ENV: process.env.NODE_ENV || 'development',
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
