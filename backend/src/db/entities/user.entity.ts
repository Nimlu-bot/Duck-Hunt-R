import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';
import { IUser } from './../../common/interfaces';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @BeforeInsert()
  async setPassword(password: string): Promise<void> {
    this.password = await hash(password || this.password, 12);
  }
}
