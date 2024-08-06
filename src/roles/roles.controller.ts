import { Controller, Get, Post, Body } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Post()
  create(@Body('role_name') roleName: string) {
    return this.rolesService.create(roleName);
  }
}
