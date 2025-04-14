import {
  /* HttpException,
  HttpStatus, */
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    // const { authorization } = req.headers;
    // if (!authorization) {
    //   throw new HttpException(
    //     'Authorization header is missing',
    //     HttpStatus.UNAUTHORIZED,
    //   );
    // }
    // if (authorization === 'asdfghjkl') {
    //   next();
    // } else {
    //   throw new HttpException(
    //     'Authorization header is invalid',
    //     HttpStatus.FORBIDDEN,
    //   );
    // }
    next();
  }
}
