import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ILogin, IToken } from 'src/common/interfaces';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async create(@Body() { login, password }: ILogin): Promise<void | IToken> {
    const token = await this.authService.getToken(login, password);
    if (token) return token;
    throw new HttpException('invalid login or password ', HttpStatus.FORBIDDEN);
  }
}
