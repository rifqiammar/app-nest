import { Injectable } from '@nestjs/common';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
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

  async findOne(id: number) {
    const result = await product.findOne({ where: { id: id } });
    return errorHandling(200, 'berhasil', result);
  }

  async update(id: number, updateProductDto: any) {
    try {
      const result = await product.update(
        {
          nama_produk: updateProductDto.produk,
          description: updateProductDto.description,
          categoryid: updateProductDto.categoryid,
          product_price: updateProductDto.price,
          image: updateProductDto.img,
          createdat: updateProductDto.createdat,
        },
        {
          where: {
            id: id,
          },
        },
      );
      return errorHandling(200, 'berhasil', result);
    } catch (error) {
      errorHandling(500, error.message);
    }
  }

  async remove(id: number) {
    try {
      const result = await product.destroy({ where: { id: id } });
      return errorHandling(200, 'sukses', result);
    } catch (e: any) {
      return errorHandling(400, e.message);
    }
  }
}
