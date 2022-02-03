import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  @ApiParam({ name: 'id' })
  async getUserInfo(@Param() { id }) {
    return await this.usersService.getUserById(id);
  }
}
