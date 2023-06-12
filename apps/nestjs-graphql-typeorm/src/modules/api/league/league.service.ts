import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LeagueEntity } from '../../entity/league.entity';

@Injectable()
export class LeagueService {
  constructor(
    @InjectRepository(LeagueEntity)
    private readonly LeagueRepository: Repository<LeagueEntity>,
  ) {}

  async create(data: { name: string }) {
    let leaggue = new LeagueEntity();
    leaggue.name = data.name;
    await leaggue.save();
    return leaggue;
  }

  async index() {
    return await this.LeagueRepository.find({ relations: ['pokemons'] });
  }

  async show(id: any) {
    return LeagueEntity.findOne(id);
  }

  async delete(id: any) {
    const league = await LeagueEntity.findOne(id);
    await this.LeagueRepository.delete(league as any);
    return { delete: true };
  }

  async update(id, data: { name: string }) {
    let league = await LeagueEntity.findOne(id);
    league.name = data.name;
    await league.save();
    return league;
  }
}
