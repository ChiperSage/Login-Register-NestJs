// import { Module } from '@nestjs/common';
// // import { WelcomeController } from './welcome/welcome.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from './auth/auth.module';
// import { WelcomeModule } from './welcome/welcome.module';
// import { DashboardModule } from './dashboard/dashboard.module';
// import { User } from './auth/user.entity';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'mysql',
//       host: 'localhost',
//       port: 3300,
//       username: 'root',
//       password: '',
//       database: 'nest_auth',
//       entities: [User],
//       synchronize: true,
//     }),
//     TypeOrmModule.forFeature([User]),
//     AuthModule,
//     WelcomeModule,
//     DashboardModule
//   ],
//   controllers: [],
//   providers: [],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { WelcomeModule } from './welcome/welcome.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { User } from './auth/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(), // Untuk memuat variabel lingkungan
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3300,
        username: 'root',
        password: '',
        database: 'nest_auth',
        entities: [User],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    WelcomeModule,
    DashboardModule,
  ],
  controllers: [], // Tambahkan jika diperlukan
  providers: [], // Tambahkan jika diperlukan
})
export class AppModule {}
