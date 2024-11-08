import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class BaseUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;
}
