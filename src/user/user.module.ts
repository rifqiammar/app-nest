import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { customers, users } from 'model';

@Module({
  // import sequelize
  imports: [SequelizeModule.forFeature([users, customers])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
