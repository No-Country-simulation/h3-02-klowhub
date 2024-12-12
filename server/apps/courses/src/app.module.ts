import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesModule } from './courses/courses.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigEnvs} from './config/envs';


@Module({
  imports: [
    JwtModule.register({
      secret: ConfigEnvs.JWT_SECRET,
      signOptions: { expiresIn: '24h' }, 
    }),
    MongooseModule.forRoot(ConfigEnvs.MONGO_URI),
    CoursesModule,
    UsersModule,
  ],
})
export class AppModule {}
