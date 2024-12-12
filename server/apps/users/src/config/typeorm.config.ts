import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigEnvs} from './envs'
import { join } from 'path';

// const isProduction = ConfigEnvs.NODE_ENV === 'production';
const isProduction = true  // no quiero ver la los sql xD

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: ConfigEnvs.POSTGRES_URL,
  synchronize: !isProduction, // Solo habilitar en desarrollo
  entities: [join(__dirname, '/../**/*.entity.{ts,js}')],
  migrations: [join(__dirname, '/../migrations/*.{ts,js}')],
  logging: !isProduction, // Solo mostrar logs en desarrollo
};
