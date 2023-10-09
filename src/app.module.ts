import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomersModule } from './customers/customers.module';
import { OrderModule } from './order/order.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
// import { AuthMiddleware } from '../middleware/auth.middleware';
import { LoggerMiddleware } from '../middleware/logger.middleware';
import { ProducModule } from './produc/produc.module';

@Module({
  providers: [LoggerMiddleware],

  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        models: [],
        autoLoadModels: true,
      }),
    }),
    UserModule,
    ProductModule,
    CustomersModule,
    OrderModule,
    UsersModule,
    AuthModule,
    ProducModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Use the middleware globally for all routes
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'user/getallusers', method: RequestMethod.GET });

    // Or use the middleware for specific routes
    // consumer.apply(AuthMiddleware).forRoutes('specific-route');
  }
}
