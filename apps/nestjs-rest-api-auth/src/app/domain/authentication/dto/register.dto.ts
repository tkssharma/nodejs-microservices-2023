import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'email of user',
    required: true,
    example: 'email@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'name',
    required: true,
    example: 'name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'password',
    required: true,
    example: 'XXXXXXXXXXX',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export default RegisterDto;
