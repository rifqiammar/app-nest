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

@Controller('user') // localhost:3000/user
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('tambah') // // localhost:3000/user/tambah
  create(@Body() createUserDto: any) {
    return this.userService.create(createUserDto);
  }

  @Get('getalluser') // localhost:3000/user/getalluser
  findAll() {
    return this.userService.findAll();
  }

  @Get('user/:id') // localhost:3000/user/:id
  findOne(@Param('id') id: string) {
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
