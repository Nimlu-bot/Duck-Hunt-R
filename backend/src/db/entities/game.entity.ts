import { IGame } from 'src/common/interfaces';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Game implements IGame {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dateTime: string;

  @Column('simple-json', { nullable: true })
  games: string[];

  @ManyToOne(() => User, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user!: User;
}
