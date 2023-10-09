import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { product } from 'model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([product])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
