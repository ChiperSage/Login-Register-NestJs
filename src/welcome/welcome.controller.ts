import { Controller, Get, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';

@Controller()
export class WelcomeController {
  @Get()
  getWelcomePage(@Req() req: Request, @Res() res: Response) {
    // Render the welcome.ejs page
    return res.render('welcome');
  }
}
