import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Включение глобальной валидации
  app
    .useGlobalPipes(new ValidationPipe({
      transform: true, // Преобразует payload в экземпляры классов DTO
      whitelist: true, // Удаляет поля, которые отсутствуют в DTO
      forbidNonWhitelisted: true, // Вызывает ошибку при наличии недопустимых полей
    }))
    .useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
