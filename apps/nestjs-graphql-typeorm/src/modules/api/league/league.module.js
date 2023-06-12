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
exports.LeagueModule = void 0;
var common_1 = require('@nestjs/common');
var league_resolver_1 = require('./league.resolver');
var league_service_1 = require('./league.service');
var typeorm_1 = require('@nestjs/typeorm');
var league_entity_1 = require('../../entity/league.entity');
var LeagueModule = /** @class */ (function () {
  function LeagueModule() {}
  LeagueModule = __decorate(
    [
      (0, common_1.Module)({
        imports: [
          typeorm_1.TypeOrmModule.forFeature([league_entity_1.LeagueEntity]),
        ],
        providers: [
          league_resolver_1.LeagueResolver,
          league_service_1.LeagueService,
        ],
      }),
    ],
    LeagueModule,
  );
  return LeagueModule;
})();
exports.LeagueModule = LeagueModule;
