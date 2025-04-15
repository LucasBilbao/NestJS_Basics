import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UserService } from './services/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { Post } from 'src/typeorm/entities/Posts.entity';
import { Property } from 'src/typeorm/entities/Property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Post, Property])],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
