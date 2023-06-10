import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import RegisterDto from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import User from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@dev/config';

enum PostgresErrorCode {
  UniqueViolation = '23505',
}
interface TokenPayload {
  userId: string;
  email: string;
}

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(body: RegisterDto) {
    const { email, name, password } = body;
    const hashPassword = await bcrypt.hash(password, 10);

    try {
      const isUserExists = await this.userService.getByEmail(
        email.toLowerCase(),
      );
      if (isUserExists) {
        throw new ConflictException(`User with Email already exists`);
      }
      const createdUser = await this.userService.create({
        ...body,
        password: hashPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  public getCookiesWithJwtToken(user: User) {
    const payload: TokenPayload = { userId: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    return token;
  }

  public async getAuthUser(email: string, textPassword: string) {
    try {
      const user = await this.userService.getByEmail(email.toLowerCase());
      if (user) {
        await this.verifyPassword(textPassword, user.password);
        return user;
      }
      throw new BadRequestException('Wrong credentials provided');
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isMatchFound = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isMatchFound) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }
}
