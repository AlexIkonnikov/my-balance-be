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
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException('User already exist', 400);
    }
    const hash = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.createUser({ ...dto, password: hash });
    return this.generateToken(user);
  }

  generateToken({ id, name, email }: User) {
    const payload = { id, name, email };
    return this.jwtService.sign(payload);
  }

  private async validateUser({ email, password }: LoginUserDto) {
    const user = await this.userService.getUserByEmail(email);
    const passwordEqual = await bcrypt.compare(password, user.password);
    if (user && passwordEqual) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Wrong login or password' });
  }
}
