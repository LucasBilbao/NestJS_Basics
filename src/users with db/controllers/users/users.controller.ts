import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUser } from 'src/users/dtos/CreateUser.dto';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';
import { CreateUserProfile } from 'src/users/dtos/CreateUserProfile.dto';
import { UpdateUser } from 'src/users/dtos/UpdateUser.dto';
import { UserService } from 'src/users/services/user/user.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  public async getUsers() {
    return await this.userService.fetchUsers();
  }

  @Post()
  public async createUser(@Body() createUserDto: CreateUser) {
    await this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  public async updateUserById(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUser,
  ) {
    await this.userService.updateUserById(id, updateUserDto);
  }

  @Delete(':id')
  public async deleteUserById(@Param('id') id: number) {
    await this.userService.deleteUserById(id);
  }

  @Post(':id/profiles')
  public async createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() profile: CreateUserProfile,
  ) {
    await this.userService.createUserProfile(id, profile);
  }

  @Post(':id/posts')
  public async createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    await this.userService.createUserPost(id, createUserPostDto);
  }
}
