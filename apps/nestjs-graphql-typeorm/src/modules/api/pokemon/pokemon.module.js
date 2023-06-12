'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
exports.__esModule = true;
exports.PokemonModule = void 0;
var common_1 = require('@nestjs/common');
var pokemon_service_1 = require('./pokemon.service');
var typeorm_1 = require('@nestjs/typeorm');
var pokemon_entity_1 = require('../../entity/pokemon.entity');
var pokemon_resolver_1 = require('./pokemon.resolver');
var PokemonModule = /** @class */ (function () {
  function PokemonModule() {}
  PokemonModule = __decorate(
    [
      (0, common_1.Module)({
        imports: [
          typeorm_1.TypeOrmModule.forFeature([pokemon_entity_1.PokemonEntity]),
        ],
        providers: [
          pokemon_service_1.PokemonService,
          pokemon_resolver_1.PokemonResolver,
        ],
      }),
    ],
    PokemonModule,
  );
  return PokemonModule;
})();
exports.PokemonModule = PokemonModule;
