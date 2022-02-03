import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BeforeInsert, Repository } from 'typeorm';
import { CreateUserDto } from './users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const candidate = this.usersRepository.create(dto);
    return await this.usersRepository.save(candidate);
  }

  async getUserByEmail(email: string) {
    const user = this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async getUserById(id: string) {
    return await this.usersRepository.findOne(id);
  }
}
