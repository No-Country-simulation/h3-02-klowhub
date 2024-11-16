import { registerAs } from "@nestjs/config";
import {config as dotenvConfig} from 'dotenv'; 
import { DataSource, DataSourceOptions } from "typeorm";
console.log(dotenvConfig)

dotenvConfig({path:'.development.env'});
const config ={
    type:'postgres',
    database:process.env.POSTGRES_DATABASE,
    host:process.env.POSTGRES_HOST,
    port:parseInt(process.env.POSTGRES_PORT),
    username:process.env.POSTGRES_USER,
    password:process.env.POSTGRES_PASSWORD ,
    ssl: {
        rejectUnauthorized: false, // Desactiva la verificación del certificado
      },
    entities:['dist/**/*.entity{.ts,.js}'],
    migrations:['dist/migrations/*{.ts,.js}'],
    autoLoadEntities:true,
    logging:true,
    //  synchronize:true,
    //  dropSchema:true,   
}


 export default registerAs('typeorm', ()=> config)
 export const connectionSource = new DataSource(config as DataSourceOptions)