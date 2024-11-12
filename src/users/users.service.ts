import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      return await this.prismaService.user.create({ data: createUserDto });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002' && error.meta?.target) {
          const uniqueFields = error.meta.target as string[];

          // Сопоставляем поля с пользовательскими сообщениями
          const fieldMessages: { [key: string]: string } = {
            email: 'Этот email уже используется',
            username: 'Это имя пользователя уже занято',
            phoneNumber: 'Этот номер телефона уже зарегистрирован',
            // Добавьте другие поля и сообщения по необходимости
          };

          // Формируем сообщения для всех нарушенных полей
          const messages = uniqueFields.map(field => fieldMessages[field] || `Поле ${field} должно быть уникальным`);

          // Выбрасываем исключение с объединенным сообщением
          throw new ConflictException(messages.join('. '));
        }
      }
      // Обработка других ошибок
      throw new InternalServerErrorException('Произошла ошибка при сохранении пользователя');
    }
  }

  async findAll(): Promise<UserResponseDto[]> {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: number): Promise<UserResponseDto> {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    return await this.prismaService.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: number) {
    return await this.prismaService.user.delete({ where: { id } });
  }
}
