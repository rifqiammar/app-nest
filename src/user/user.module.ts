import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { customers, users } from 'model';

@Global() // Global Module, Agar bisa di akses ke module lain
@Module({
  // import sequelize
  imports: [SequelizeModule.forFeature([users, customers])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
