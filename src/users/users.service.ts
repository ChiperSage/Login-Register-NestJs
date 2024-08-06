import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async create(user: User): Promise<void> {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    await this.usersRepository.save(user);
  }

  async getProfile(userId: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { user_id: userId } });
  }
}
