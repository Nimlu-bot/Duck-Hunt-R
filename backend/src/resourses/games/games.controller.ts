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
import { GamesService } from 'src/resourses/games/games.service';
import { IGame, IGameDTO } from 'src/common/interfaces';

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Post()
  async create(@Body() user: IGame): Promise<IGameDTO> {
    const newGame = await this.gamesService.create(user);
    if (newGame === null) {
      throw new HttpException('Game exists ', HttpStatus.NOT_FOUND);
    } else {
      return newGame;
    }
  }

  @Get()
  async getAll(): Promise<IGameDTO[]> {
    return await this.gamesService.getAll();
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<IGameDTO | void> {
    const game = await this.gamesService.get(id);
    if (!game) {
      throw new HttpException('Game not found ', HttpStatus.NOT_FOUND);
    }
    return game;
  }

  @Put(':id')
  async update(
    @Body() game: IGame,
    @Param('id') id: string,
  ): Promise<IGameDTO | void> {
    const updatedGame = await this.gamesService.update(id, game);
    if (!updatedGame) {
      throw new HttpException('Game not found ', HttpStatus.NOT_FOUND);
    }
    return updatedGame;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<void> {
    if (await this.gamesService.remove(id)) return;
    throw new HttpException('Game not found ', HttpStatus.NOT_FOUND);
  }
}
