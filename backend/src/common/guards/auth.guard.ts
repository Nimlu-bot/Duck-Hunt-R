import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new HttpException(
        'invalid login or password ',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const [type, token] = request.headers.authorization.split(' ');
    try {
      if (type === 'Bearer' && token && JWT_SECRET_KEY) {
        const isVerify = jwt.verify(token, JWT_SECRET_KEY);
        if (isVerify) return true;
      }
    } catch (err) {
      return false;
    }
    return false;
  }
}
