import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
  ) {}

  async assignRoleToUser(roleId: number, userId: number): Promise<Group> {
    const group = this.groupsRepository.create({ role_id: roleId, user_id: userId });
    return this.groupsRepository.save(group);
  }
}
