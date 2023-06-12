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
exports.AppModule = void 0;
var common_1 = require('@nestjs/common');
var graphql_1 = require('@nestjs/graphql');
var config_module_1 = require('./modules/config/config.module');
var typeorm_1 = require('@nestjs/typeorm');
var config_service_1 = require('./modules/config/config.service');
var api_module_1 = require('./modules/api/api.module');
var path_1 = require('path');
var AppModule = /** @class */ (function () {
  function AppModule() {}
  AppModule = __decorate(
    [
      (0, common_1.Module)({
        imports: [
          config_module_1.ConfigModule,
          typeorm_1.TypeOrmModule.forRootAsync({
            imports: [config_module_1.ConfigModule],
            inject: [config_service_1.ConfigService],
            useFactory: function (configService) {
              return {
                name: 'default',
                type: configService.get('DB_TYPE'),
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DATABASE'),
                entities: [__dirname + '/**/**.entity{.ts,.js}'],
                synchronize: configService.get('DB_SYNC'),
              };
            },
          }),
          graphql_1.GraphQLModule.forRoot({
            playground: true,
            typePaths: ['./**/*.graphql'],
            context: function (_a) {
              var req = _a.req;
              return { headers: req.headers };
            },
            debug: true,
            definitions: {
              path: (0, path_1.join)(process.cwd(), 'src/graphql.schema.ts'),
              outputAs: 'class',
            },
          }),
          api_module_1.ApiModule,
        ],
      }),
    ],
    AppModule,
  );
  return AppModule;
})();
exports.AppModule = AppModule;
