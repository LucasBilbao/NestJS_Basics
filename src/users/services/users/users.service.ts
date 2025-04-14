import { Injectable } from '@nestjs/common';
import { User } from 'src/users/utils/User.interface';

@Injectable()
export class UsersService {
  private fakeUsers: User[] = [
    {
      username: 'john_doe',
      email: 'john@doe.com',
      age: 25,
    },
    {
      username: 'jane_doe',
      email: 'jane@doe.com',
      age: 30,
    },
  ];

  public fetchUsers() {
    return this.fakeUsers;
  }

  public createUser(user: User) {
    this.fakeUsers.push(user);
    return user;
  }
}
