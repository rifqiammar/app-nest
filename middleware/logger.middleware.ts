import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { errorHandling } from 'helper/errorhandling';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return errorHandling(500, 'Authorization Belum Terisi');
    }

    // Pengecekan Token Jika Sama
    jwt.verify(authorization, process.env.SECRET_KEY);
    next();
  }
}
