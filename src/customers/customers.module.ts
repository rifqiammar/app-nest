import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { customers } from 'model/customers';

@Module({
  imports: [SequelizeModule.forFeature([customers])],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
