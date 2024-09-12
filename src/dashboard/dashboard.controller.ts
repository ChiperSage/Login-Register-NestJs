// src/dashboard/dashboard.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '../auth/auth.guard'; // Import the auth guard

@Controller('dashboard')
export class DashboardController {
  @Get()
  @UseGuards(AuthGuard) // Ensure the user is authenticated before accessing the dashboard
  getDashboard(@Req() req: Request, @Res() res: Response) {
    // Access the user from the session
    const user = req.session.user;

    // Render the dashboard page with the user data
    return res.render('dashboard', { user });
  }
}
