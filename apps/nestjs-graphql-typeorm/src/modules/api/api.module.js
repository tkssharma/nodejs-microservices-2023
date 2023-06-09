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
exports.ApiModule = void 0;
var common_1 = require('@nestjs/common');
var core_1 = require('@nestjs/core');
var logging_interceptor_1 = require('../shared/logging.interceptor');
var pokemon_module_1 = require('./pokemon/pokemon.module');
var user_module_1 = require('./user/user.module');
var league_module_1 = require('./league/league.module');
var ApiModule = /** @class */ (function () {
  function ApiModule() {}
  ApiModule = __decorate(
    [
      (0, common_1.Module)({
        imports: [
          user_module_1.UserModule,
          pokemon_module_1.PokemonModule,
          league_module_1.LeagueModule,
        ],
        providers: [
          {
            provide: core_1.APP_INTERCEPTOR,
            useClass: logging_interceptor_1.LoggingInterceptor,
          },
        ],
        exports: [
          user_module_1.UserModule,
          pokemon_module_1.PokemonModule,
          league_module_1.LeagueModule,
        ],
      }),
    ],
    ApiModule,
  );
  return ApiModule;
})();
exports.ApiModule = ApiModule;
