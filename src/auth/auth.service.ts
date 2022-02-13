import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto, CreateUserDto } from '../users/users.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(dto: LoginUserDto) {
    const { password, ...user } = await this.validateUser(dto);
    const response = {
      user,
      token: this.generateToken({ ...user, password }),
    };
    return response;
  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException('User already exist', 400);
    }
    const hash = await bcrypt.hash(dto.password, 5);
    const { password, ...user } = await this.userService.createUser({
      ...dto,
      password: hash,
    });
    const response = {
      user,
      token: this.generateToken({ ...user, password }),
    };
    return response;
  }

  generateToken({ id, name, email }: User) {
    const payload = { id, name, email };
    return this.jwtService.sign(payload);
  }

  private async validateUser({ email, password }: LoginUserDto) {
    const user = await this.userService.getUserByEmail(email);
    if (user) {
      const passwordEqual = await bcrypt.compare(password, user.password);
      if (passwordEqual) {
        return user;
      }
      throw new UnauthorizedException({ message: 'Wrong login or password' });
    }
    throw new UnauthorizedException({ message: 'Wrong login or password' });
  }
}
