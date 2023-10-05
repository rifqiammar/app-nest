import { Injectable } from '@nestjs/common';
import { customers, users } from 'model';
import { errorHandling } from 'helper/errorhandling';
import * as bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UserService {
  //Defns Sequelize Type Script
  constructor(private readonly sequelize: Sequelize) {}

  async create(body: any) {
    try {
      const { username, password } = body;

      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);

      const result = await users.create(
        {
          username: username,
          password: hash,
        },
        { returning: true },
      );
      return errorHandling(200, 'Berhasil', result);
    } catch (error) {
      return errorHandling(500, error.message);
    }
  }

  // Query Store Procedure
  async insertusercust(fields: any) {
    try {
      const { dt_user, dt_customer } = fields;
      dt_user.createdat = new Date();
      dt_customer.createdat = new Date();

      const saltOrRounds = 10;
      const hash = await bcrypt.hash(dt_user.password, saltOrRounds);
      dt_user.password = hash;

      const query = `call insertCustomer('[${JSON.stringify(
        dt_user,
      )}]','[${JSON.stringify(dt_customer)}]')`;

      const result = await this.sequelize.query(query);
      return errorHandling(200, 'Berhasil', result);
    } catch (error) {
      return errorHandling(500, error.message);
    }
  }

  async findAll() {
    try {
      const result = await users.findAll();
      return result;
    } catch (error) {
      return `${error.message}`;
    }
  }

  async findAllCustomer() {
    try {
      const result = await customers.findAll();
      return result;
    } catch (error) {
      return `${error.message}`;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
