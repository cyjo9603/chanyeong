import { User } from '@/users/users.model';
import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';

export interface TokenUser {
  id: number;
}

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(userId: string, password: string): Promise<TokenUser | null> {
    const user = await this.userService.getByUserId(userId);
    const isCompared = await user?.comparePassword(password);

    if (!isCompared || !user) return null;

    return { id: user.id };
  }
}
