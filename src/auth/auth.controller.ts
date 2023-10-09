import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() body: any) {
    return this.authService.create(body);
  }
}
