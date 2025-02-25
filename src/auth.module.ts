import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auth/auth.service';
import { JwtStrategy } from './service/auth/jwt.strategy';
import { LocalStrategy } from './service/auth/local.strategy';
import { UserService } from './service/user/user.service';
import { PrismaService } from './common/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SettingService } from './common/setting';

@Module({
  imports: [
    JwtModule.register({
      secret: SettingService.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, UserService, PrismaService],
  exports: [AuthService, JwtModule], // Ensure JwtModule is exported if used elsewhere
})
export class AuthModule {}