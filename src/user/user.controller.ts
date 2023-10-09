import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './userdto.dto';

@Controller('user') // localhost:3000/user
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('tambah') // // localhost:3000/user/tambah |
  // @body == req.body || params,
  create(@Body() body: any) {
    return this.userService.create(body);
  }

  // Store Procedure Menggunakan Query
  @Post('/tambahusercust')
  insertusercust(@Body() fields: any) {
    return this.userService.insertusercust(fields);
  }

  @Get('getallusers') // localhost:3000/user/getalluser
  findAll() {
    return this.userService.findAll();
  }

  @Get('getallcustomers') // localhost:3000/user/getalluser
  findAllCustomers() {
    return this.userService.findAllCustomer();
  }

  @Get('user/:id') // localhost:3000/user/:id | // app.get('/user/:id') di express | ('app/user/:id)
  // @params == req.params
  findOne(@Param('id') id: string) {
    // +id, convert operator
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

// https://docs.nestjs.com/controllers
