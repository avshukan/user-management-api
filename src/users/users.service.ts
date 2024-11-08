import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = new UserResponseDto();
    user.id = 1;
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.createdAt = new Date();
    return Promise.resolve(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    const user = new UserResponseDto();
    user.id = id;
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
