import { Injectable, ConflictException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(registerDto: { username: string; email: string; password: string }): Promise<void> {
    const { username, email, password } = registerDto;

    // Check if username or email already exists
    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      // Provide specific error messages based on existing user attributes
      if (existingUser.username === username) {
        throw new ConflictException('Username already exists');
      }
      if (existingUser.email === email) {
        throw new ConflictException('Email already exists');
      }
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(); // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    // Save new user
    const newUser = this.userRepository.create({ username, email, password: hashedPassword });
    await this.userRepository.save(newUser);
  }

  async validateUser(usernameOrEmail: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });

    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
