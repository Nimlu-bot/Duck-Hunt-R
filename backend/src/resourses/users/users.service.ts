import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser, IUserDTO } from 'src/common/interfaces';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<IUser>,
  ) {}

  private toResponse(user: IUser) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  async create(user: IUser): Promise<IUserDTO | null> {
    const res = await this.userRepository.findOne({
      where: { login: user.login },
    });
    if (res) return null;
    const userToSave = this.userRepository.create(user);
    const savedUser = await this.userRepository.save(userToSave);
    return this.toResponse(savedUser);
  }

  async getAll(): Promise<IUserDTO[]> {
    const users = await this.userRepository.find({ where: {} });
    return users.map((user) => this.toResponse(user));
  }

  async get(id: string | undefined): Promise<IUserDTO | null> {
    const res = await this.userRepository.findOne(id);
    if (res === undefined) return null;
    return this.toResponse(res);
  }

  async update(id: string, data: IUser): Promise<IUserDTO> {
    const res = await this.userRepository.findOne(id);
    if (!res) {
      return null;
    }
    const userToSave = this.userRepository.create({ ...res, ...data });
    const savedUser = await this.userRepository.save(userToSave);
    return this.toResponse(savedUser);
  }

  async remove(id: string | undefined): Promise<boolean> {
    if (id) {
      const user = await this.userRepository.delete(id);
      return !!user.affected;
    }
  }

  async getAuth(login: string): Promise<IUser | void> {
    const res = await this.userRepository.findOne({ login });
    if (res === undefined) return undefined;
    return res;
  }
}
