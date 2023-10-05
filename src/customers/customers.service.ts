import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { customers } from 'model';
import { errorHandling } from 'helper/errorhandling';

@Injectable()
export class CustomersService {
  create(createCustomerDto: CreateCustomerDto) {
    return 'This action adds a new customer';
  }

  async findAll() {
    try {
      const result = await customers.findAll();
      return result;
    } catch (error) {
      return error.message;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  async update(id: number, body: any) {
    try {
      const { firstname, lastname } = body;
      const result = await customers.update(
        { firstname, lastname },
        {
          where: {
            id,
          },
        },
      );

      return errorHandling(200, 'Update Berhasil', result);
    } catch (error) {
      return errorHandling(500, error.message);
    }
  }

  async remove(id: number) {
    try {
      const result = await customers.destroy({
        where: {
          id,
        },
      });
      return errorHandling(200, 'Hapus Berhasil', result);
    } catch (error) {
      return errorHandling(500, error.message);
    }
  }
}
