import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserPost } from 'src/interfaces/CreateUserPost.interface';
import { CreateUserProfile } from 'src/interfaces/CreateUserProfile.interface';
import { UserDto } from 'src/interfaces/User.interface';
import { Post } from 'src/typeorm/entities/Posts.entity';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { Property } from 'src/typeorm/entities/Property.entity';
import { User } from 'src/typeorm/entities/User.entity';
import { UpdateUser } from 'src/users/dtos/UpdateUser.dto';

import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(Property) private propertyRepo: Repository<Property>,
  ) {}

  public async fetchUsers() {
    const user = await this.userRepo.findOne({
      where: { id: 4 },
      relations: { properties: true },
    });
    if (!user) {
      throw new HttpException(`User not found`, HttpStatus.BAD_REQUEST);
    }

    const properties = await this.propertyRepo.find();

    user.properties = [...user.properties, ...properties];
    await this.userRepo.save(user);

    // const newProperty = this.propertyRepo.create({
    //   name: 'Property 1',
    //   users: [user],
    // });
    // await this.propertyRepo.save(newProperty);

    return this.userRepo.find({
      relations: { profile: true, posts: true, properties: true },
      select: {
        username: true,
        profile: {
          firstName: true,
          lastName: true,
        },
        posts: {
          title: true,
          description: true,
        },
      },
    });
  }

  public createUser(user: UserDto) {
    const newUser = this.userRepo.create({ ...user });
    return this.userRepo.save(newUser);
  }

  public updateUserById(id: number, updatedUser: UpdateUser) {
    return this.userRepo.update({ id }, { ...updatedUser });
  }

  public deleteUserById(id: number) {
    return this.userRepo.delete({ id });
  }

  public async createUserProfile(id: number, userProfile: CreateUserProfile) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new HttpException(`User not found`, HttpStatus.BAD_REQUEST);
    }
    const newProfile = this.profileRepo.create({ ...userProfile });
    const savedProfile = await this.profileRepo.save(newProfile);
    user.profile = savedProfile;

    return this.userRepo.save(user);
  }

  public async createUserPost(id: number, userPost: CreateUserPost) {
    // Better practice would be to define a getUserById method
    // and use it here instead of repeating the code
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new HttpException(`User not found`, HttpStatus.BAD_REQUEST);
    }
    const newPost = this.postRepo.create({ ...userPost, user });
    return this.postRepo.save(newPost);
  }
}
