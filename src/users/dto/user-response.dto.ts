import { BaseUserDto } from './base-user.dto';

export class UserResponseDto extends BaseUserDto {
    id: number;
    createdAt: Date;
}
