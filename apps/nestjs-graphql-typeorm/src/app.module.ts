import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ApiModule } from './modules/api/api.module';
import { join } from 'path';
import { DBModule } from '@dev/database';
import { ConfigModule } from '@dev/config';

import { PokemonEntity } from './modules/entity/pokemon.entity';
import { LeagueEntity } from './modules/entity/league.entity';
console.log(process.env);

@Module({
  imports: [
    ConfigModule,
    DBModule.forRoot({
      entities: [LeagueEntity, PokemonEntity],
    }),
    GraphQLModule.forRoot({
      playground: true,
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ headers: req.headers }),
      debug: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class',
      },
    }),
    ApiModule,
  ],
})
export class AppModule {}
