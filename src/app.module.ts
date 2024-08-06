import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { GroupsModule } from './groups/groups.module';
import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { Group } from './groups/entities/group.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your-username',
      password: 'your-password',
      database: 'your-database',
      entities: [User, Role, Group],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    GroupsModule,
  ],
})
export class AppModule {}
