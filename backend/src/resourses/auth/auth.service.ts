import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { IToken } from 'src/common/interfaces';
import { UsersService } from 'src/resourses/users/users.service';

@Injectable()
export class AuthService {
  comparePassword(password: string, passwordHash: string): Promise<boolean> {
    return compare(password, passwordHash);
  }

  constructor(private usersService: UsersService) {}

  async getToken(userLogin: string, password: string): Promise<null | IToken> {
    const user = await this.usersService.getAuth(userLogin);
    if (!user) {
      return null;
    }
    if (user.password) {
      const compareRes = await compare(password, user.password);
      if (compareRes) {
        const { id, login } = user;
        const token = jwt.sign(
          { id, login },
          process.env.JWT_SECRET_KEY as Secret,
          {
            expiresIn: '24w',
          },
        );
        return { token };
      }
    }
    return null;
  }
}
