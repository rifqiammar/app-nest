import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app') // app itu penamaanya | app = endpoint, app/user/:id, ENDPOINT generalnya
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Method Get
  @Get() // Route Root
  getHello3(): string {
    // Memanggil Method di App Service
    return this.appService.getHello();
  }

  // Method Get
  @Get('/user/:id') // app.get('/user/:id') di express | ('app/user/:id)
  getHello(): string {
    // Memanggil Method di App Service
    return this.appService.getHello();
  }

  @Get('/hello') // route
  getHello2(): string {
    return this.appService.getHello();
  }
}
