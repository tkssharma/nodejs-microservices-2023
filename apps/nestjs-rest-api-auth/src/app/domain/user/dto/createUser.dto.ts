import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsString,
  MinLength,
  minLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'email of user',
    required: true,
    example: 'email@gmail.com',
  })
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'name',
    required: true,
    example: 'name',
  })
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'password with min 6 length',
    required: true,
    example: 'XXXXXXXXXX',
  })
  @IsDefined()
  @MinLength(6)
  password: string;
}

export default CreateUserDto;
