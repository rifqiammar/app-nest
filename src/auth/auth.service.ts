import { Injectable } from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';
import { errorHandling } from 'helper/errorhandling';
import * as bcrypt from 'bcrypt';
// import { Sequelize } from 'sequelize-typescript';
// import { users } from 'model';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userservice: UserService) {}

  async create(body: any) {
    try {
      const usr = await this.userservice.getByUser(body.username);
      // console.log(usr.data.password);

      // Cek jika user tidak di temukan
      if (!usr) {
        throw new Error(`${body.username} Tidak di Temukan`);
      }
      const match = await bcrypt.compare(body.password, usr.data.password);

      // cek jika user sama
      if (!match) {
        throw new Error(`${body.username} Password Salah`);
      }

      // Token Here
      // Jika Berhasil
      const token = jwt.sign(
        { username: usr.data.username, createdat: usr.data.createdAt },
        process.env.SECRET_KEY,
        { expiresIn: '30s' },
      );
      return errorHandling(200, 'Selamat Anda Berhasil Login', token);
    } catch (error) {
      return errorHandling(400, error.message);
    }
  }
}
