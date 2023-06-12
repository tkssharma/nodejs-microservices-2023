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
exports.LoggingInterceptor = void 0;
var common_1 = require('@nestjs/common');
var graphql_1 = require('@nestjs/graphql');
var operators_1 = require('rxjs/operators');
var LoggingInterceptor = /** @class */ (function () {
  function LoggingInterceptor() {}
  LoggingInterceptor.prototype.intercept = function (context, next) {
    var now = Date.now();
    var req = context.switchToHttp().getRequest();
    if (req) {
      var method_1 = req.method;
      var url_1 = req.url;
      return next.handle().pipe(
        (0, operators_1.tap)(function () {
          return common_1.Logger.log(
            ''
              .concat(method_1, ' ')
              .concat(url_1, ' ')
              .concat(Date.now() - now, 'ms'),
            context.getClass().name,
          );
        }),
      );
    } else {
      var ctx = graphql_1.GqlExecutionContext.create(context);
      var resolverName_1 = ctx.constructorRef.name;
      var info_1 = ctx.getInfo();
      return next.handle().pipe(
        (0, operators_1.tap)(function () {
          return common_1.Logger.log(
            ''
              .concat(info_1.parentType, ' "')
              .concat(info_1.fieldName, '" ')
              .concat(Date.now() - now, 'ms'),
            resolverName_1,
          );
        }),
      );
    }
  };
  LoggingInterceptor = __decorate(
    [(0, common_1.Injectable)()],
    LoggingInterceptor,
  );
  return LoggingInterceptor;
})();
exports.LoggingInterceptor = LoggingInterceptor;
