// src/auth/auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    // Check if the user is logged in
    if (request.session && request.session.user) {
      return true; // User is logged in, allow access
    }

    // User is not logged in, redirect to login page
    response.redirect('/auth/login');
    return false;
  }
}
