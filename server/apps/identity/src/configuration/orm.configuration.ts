import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

export enum ENVIRONMENT {
  PRODUCTION = 'production',
  STAGING = 'staging',
  DEVELOPMENT = 'development',
  AUTOMATED_TEST = 'automated_tests',
}

const production: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
};

const staging: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
};

const development: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  ssl: {
    rejectUnauthorized: false, 
  },
};

const automatedTests: DataSourceOptions = {
  type: 'sqlite',
  database: `./data/tests.${Math.random()}.db`,
  synchronize: true,
  dropSchema: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const datasourceOptions: DataSourceOptions = (() => {
  if (process.env.NODE_ENV === ENVIRONMENT.PRODUCTION) {
    return production;
  }

  if (process.env.NODE_ENV === ENVIRONMENT.STAGING) {
    return staging;
  }

  if (process.env.NODE_ENV === ENVIRONMENT.DEVELOPMENT) {
    return development;
  }

  if (process.env.NODE_ENV === ENVIRONMENT.AUTOMATED_TEST) {
    return automatedTests;
  }

  throw new Error('No environment defined');
})();

export default new DataSource({
  ...datasourceOptions,
  entities: [
    join(__dirname, '../modules/**/infrastructure/persistence/*.schema.ts'),
  ],
  migrations: ['./data/migrations/*.ts'],
});
