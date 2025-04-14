import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

// Base path for this controller is /users
@Controller('users')
/* @UseGuards(AuthGuard) */
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  /*@Query('sortDesc', new ParseArrayPipe({ items: Number, separator: ',' })) sortDesc: number[],*/
  @UseGuards(AuthGuard)
  public getUsers() {
    return this.userService.fetchUsers();
  }

  @Get('posts')
  public getUsersPosts() {
    return [
      {
        title: 'Post 1',
        content: 'This is the first post',
      },
      {
        title: 'Post 2',
        content: 'This is the second post',
      },
    ];
  }

  // Request and Response are imported from express
  //   @Post()
  //   public createUser(@Req() request: Request, @Res() response: Response) {
  //     console.log(request.body);
  //     response.send('User created');
  //   }

  //   The NestJS way of handling requests
  @Post()
  @UsePipes(new ValidationPipe()) // needs new vailidation pipe in order to validate the body
  //   @UsePipes(new ValidationPipe({ transform: true })) // this will transform the body to the class instance
  //   @UsePipes(new ValidationPipe({ whitelist: true })) // this will remove the properties that are not in the class
  //   @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true })) // this will throw an error if there are properties that are not in the class
  public createUser(@Body(ValidateCreateUserPipe) body: CreateUserDto) {
    console.log(body);
    return this.userService.createUser(body);
  }

  @Get(':id')
  public getUserById(@Param('id', ParseIntPipe) id: string) {
    console.log(id);
    return { id };
  }
}
