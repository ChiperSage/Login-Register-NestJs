import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Set the view engine to EJS
  app.setViewEngine('ejs');

  // Serve static files from the 'public' directory
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Set the views directory
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.use(
    session({
      secret: 'your-secret-key', // Use a secure, unique key for your application
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Set to true if using HTTPS
    }),
  );

  await app.listen(3000);
}
bootstrap();

