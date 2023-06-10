import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { DBModule } from '@dev/database';

import { RouteInfo } from '@nestjs/common/interfaces';
import { AuthMiddleware } from '../core/middleware/auth.middleware';
import { AppLoggerModule, LoggerMiddleware } from '@dev/logger';
import { UserModule } from './user/user.module';
import User from './user/user.entity';
import { PostModule } from './post/post.module';
import { AuthModule } from './authentication/auth.module';
export const GLOBAL_PREFIX = '/api/v1';

@Module({
  imports: [
    AppLoggerModule,
    PostModule,
    UserModule,
    AuthModule,
    DBModule.forRoot({
      entities: [User],
    }),
  ],
  providers: [],
  controllers: [],
})
export class DomainModule {
  /*
  public authRoutes: Array<RouteInfo> = [
    {
      path: `*`,
      method: RequestMethod.ALL,
    },
  ];

  public publicRoutes: Array<RouteInfo> = [
    {
      path: `${GLOBAL_PREFIX}/health`,
      method: RequestMethod.GET,
    },
  ];

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(...this.publicRoutes)
      .forRoutes(...this.authRoutes);

    consumer.apply(LoggerMiddleware).forRoutes('*');
  } */
}
