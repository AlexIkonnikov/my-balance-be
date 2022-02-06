import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, CreateUserDto } from '../users/users.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authSrvice: AuthService) {}

  @ApiBody({ type: LoginUserDto })
  @Post('login')
  login(@Body() dto: LoginUserDto) {
    return this.authSrvice.login(dto);
  }

  @Post('registration')
  registration(@Body() dto: CreateUserDto) {
    return this.authSrvice.registration(dto);
  }
}
