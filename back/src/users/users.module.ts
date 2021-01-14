import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from './users.model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
