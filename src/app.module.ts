import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
/* import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; */

@Module({
  imports: [
    UsersModule,
    /* ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: env.DB_HOST || 'localhost',
      port: env.DB_PORT ? parseInt(env.DB_PORT) : 3306,
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_DATABASE,
      entities: [User, Profile, Post, Property],
      synchronize: true,
    }), */
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
