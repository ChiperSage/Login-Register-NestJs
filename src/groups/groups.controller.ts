import { Controller, Post, Body } from '@nestjs/common';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Post()
  assignRoleToUser(@Body('role_id') roleId: number, @Body('user_id') userId: number) {
    return this.groupsService.assignRoleToUser(roleId, userId);
  }
}
