import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IGame, IGameDTO } from 'src/common/interfaces';
import { Repository } from 'typeorm';
import { Game } from 'src/db/entities/game.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<IGame>,
  ) {}

  async create(game: IGame): Promise<IGameDTO | null> {
    const res = await this.gameRepository.findOne({
      where: { dateTime: game.dateTime },
    });
    if (res) return null;
    const gameToSave = this.gameRepository.create(game);
    const savedGame = await this.gameRepository.save(gameToSave);
    return savedGame;
  }

  async getAll(): Promise<IGameDTO[]> {
    return await this.gameRepository.find({ where: {} });
  }

  async get(id: string | undefined): Promise<IGameDTO | null> {
    const game = await this.gameRepository.findOne(id);
    if (game === undefined) return null;
    return game;
  }

  async update(id: string, data: IGame): Promise<IGameDTO> {
    const res = await this.gameRepository.findOne(id);
    if (!res) {
      return null;
    }
    const gameToSave = this.gameRepository.create({ ...res, ...data });
    const savedGame = await this.gameRepository.save(gameToSave);
    return savedGame;
  }

  async remove(id: string | undefined): Promise<boolean> {
    if (id) {
      const game = await this.gameRepository.delete(id);
      return !!game.affected;
    }
  }
}
