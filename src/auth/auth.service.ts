import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(body: { username: string; email: string; password: string }) {
    // Save user to the database
    const newUser = this.userRepository.create(body);
    await this.userRepository.save(newUser);
    return `User with email ${body.email} has been registered.`;
  }

  async login(body: { email: string; password: string }) {
    // Check user credentials
    const user = await this.userRepository.findOneBy({ email: body.email });
    if (user && user.password === body.password) {
      return `User with email ${body.email} has been logged in.`;
    } else {
      return `Invalid credentials.`;
    }
  }
}
