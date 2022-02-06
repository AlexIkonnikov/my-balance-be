import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'secret_asfs',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
