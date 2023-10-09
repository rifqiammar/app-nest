import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { product } from 'model';
import { Sequelize } from 'sequelize-typescript';
import { errorHandling } from 'helper/errorhandling';

@Injectable()
export class ProductService {
  constructor(private readonly sequelize: Sequelize) {}

  async create(fields: any) {
    try {
      const result = await product.create(
        {
          nama_produk: fields.produk,
          description: fields.description,
          categoryid: fields.categoryid,
          product_price: fields.price,
          image: fields.img,
          createdat: fields.createdat,
        },
        {
          returning: true,
        },
      );
      return errorHandling(200, 'berhasil', result);
    } catch (error) {
      return errorHandling(500, error.message);
    }
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
