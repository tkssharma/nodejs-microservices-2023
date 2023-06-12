import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { PokemonEntity } from './pokemon.entity';

@Entity('league')
export class LeagueEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('varchar', { length: 500, unique: true })
  name: string;

  @OneToMany((type) => PokemonEntity, (pokemon) => pokemon.league)
  pokemons: PokemonEntity[];
}
