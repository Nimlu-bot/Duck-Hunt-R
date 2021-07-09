import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IUser, IUserDTO } from 'src/common/interfaces';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private UserService: UsersService) {}

  @Post()
  async create(@Body() user: IUser): Promise<IUserDTO> {
    const newUser = await this.UserService.create(user);
    if (newUser === null) {
      throw new HttpException('User exists ', HttpStatus.NOT_FOUND);
    } else {
      return newUser;
    }
  }

  @Get()
  async getAll(): Promise<IUserDTO[]> {
    return await this.UserService.getAll();
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<IUserDTO | void> {
    const user = await this.UserService.get(id);
    if (!user) {
      throw new HttpException('User not found ', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Put(':id')
  async update(
    @Body() user: IUser,
    @Param('id') id: string,
  ): Promise<IUserDTO | void> {
    const updatedUser = await this.UserService.update(id, user);
    if (!updatedUser) {
      throw new HttpException('User not found ', HttpStatus.NOT_FOUND);
    }
    return updatedUser;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<void> {
    if (await this.UserService.remove(id)) return;
    throw new HttpException('User not found ', HttpStatus.NOT_FOUND);
  }
}
