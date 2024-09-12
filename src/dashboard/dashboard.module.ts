// src/dashboard/dashboard.module.ts
import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { AuthGuard } from '../auth/auth.guard'; // Import the auth guard

@Module({
  controllers: [DashboardController],
  providers: [AuthGuard], // Add the AuthGuard to the providers
})
export class DashboardModule {}
