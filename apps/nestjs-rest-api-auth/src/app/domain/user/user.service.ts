import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './user.entity';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
  async getByEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (user) {
      return user;
    }
    return null;
  }

  async getById(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (user) {
      return user;
    }
    return null;
  }

  async create(userData: CreateUserDto) {
    userData.email = userData.email.toLowerCase();
    const newUser = await this.userRepo.create(userData);
    await this.userRepo.save(newUser);
    return newUser;
  }
}
