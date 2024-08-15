import { Controller, Get, Res, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { join } from 'path';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('register')
  getRegister(@Res() res: Response) {
    // Serve the registration form
    return res.sendFile(join(__dirname, '..', '..', 'public', 'register.html'));
  }

  @Post('register')
  async register(@Body() body: { username: string; email: string; password: string }) {
    // Handle registration
    return this.authService.register(body);
  }

  @Get('login')
  getLogin(@Res() res: Response) {
    // Serve the login form
    return res.sendFile(join(__dirname, '..', '..', 'public', 'login.html'));
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    // Handle login
    return this.authService.login(body);
  }
}
