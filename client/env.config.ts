interface EnvConfig {
    APP_URL: string;
    API_URL: string;

  }
const env: EnvConfig = {
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8080',
  };

  export default env;