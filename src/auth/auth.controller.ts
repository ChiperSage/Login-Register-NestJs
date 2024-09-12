import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  Req,
  Render,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto'; // DTO untuk validasi register
import { LoginDto } from './dto/login.dto'; // DTO untuk validasi login

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('register')
  @Render('register')
  getRegisterPage() {
    return { errorMessage: '', username: '', email: '' };
  }

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto, // Validasi otomatis dengan DTO
    @Res() res: Response
  ) {
    const { username, email, password, confirmPassword } = registerDto;

    // Validasi password dan confirmPassword
    if (password !== confirmPassword) {
      return res.render('register', {
        errorMessage: 'Passwords do not match',
        username,
        email,
      });
    }

    try {
      await this.authService.register({ username, email, password });
      return res.redirect('/auth/login'); // Redirect ke halaman login
    } catch (error) {
      const errorMessage =
        error instanceof ConflictException ? error.message : 'An unexpected error occurred';
      return res.render('register', {
        errorMessage,
        username,
        email,
      });
    }
  }

  @Get('login')
  @Render('login')
  getLoginPage() {
    return { errorMessage: '', usernameOrEmail: '' };
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto, // Menggunakan DTO untuk validasi input
    @Res() res: Response,
    @Req() req: Request
  ) {
    const { usernameOrEmail, password } = loginDto;

    try {
      const user = await this.authService.validateUser(usernameOrEmail, password);
      req.session.user = user; // Menyimpan user ke sesi
      return res.redirect('/dashboard'); // Berhasil login, redirect ke dashboard
    } catch (error) {
      const errorMessage =
        error instanceof UnauthorizedException ? error.message : 'An unexpected error occurred';
      return res.render('login', { errorMessage, usernameOrEmail });
    }
  }

  @Get('/logout')
  async logoutUser(@Req() req: Request, @Res() res: Response) {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error('Failed to destroy session during logout:', err);
          return res.redirect('/dashboard'); // Jika gagal, redirect ke dashboard
        }
        res.clearCookie('connect.sid'); // Menghapus cookie sesi
        return res.redirect('/auth/login'); // Redirect ke halaman login
      });
    } else {
      return res.redirect('/auth/login');
    }
  }
}


