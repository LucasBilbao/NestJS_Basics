import {
  HttpException,
  HttpStatus,
  /* ArgumentMetadata, */ Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto /* , metadata: ArgumentMetadata */): any {
    console.log('Value:', value);
    const age = parseInt(value.age.toString(), 10);
    if (isNaN(age)) {
      throw new HttpException(
        'Invalid Data type for property age',
        HttpStatus.BAD_REQUEST,
      );
    }
    return { ...value, age };
  }
}
