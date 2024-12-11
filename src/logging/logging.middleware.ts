import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    console.log(`Request to ${req.method} ${req.originalUrl} started at ${new Date(startTime).toISOString()}`);

    res.on('finish', () => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      console.log(`Request to ${req.method} ${req.originalUrl} ended at ${new Date(endTime).toISOString()} - ${res.statusCode} - Duration: ${duration}ms`);
    });

    next();
  }
}
