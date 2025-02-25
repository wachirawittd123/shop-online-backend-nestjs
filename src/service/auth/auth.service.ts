import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserComponents } from '../user/user.components';
import { PrismaService } from 'src/common/prisma.service';
import { CommonComponents } from '../common.components';
import { IUserProfile } from 'src/interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UserService, private readonly prisma: PrismaService) {}

  async validateUser(email: string, password: string) {
    const user = await UserComponents.findUser(this.prisma, { email: email});
    if (!user) return null;
    return user;
  }

  async login(user: any) {
    const profile: IUserProfile | any = await UserComponents.getProfile(this.prisma, { email: user.email })
    return { 
        ...profile,
        token: await CommonComponents.signToken(profile),
        rtoken: await CommonComponents.refreshToken({...profile, password: user.password}),
     };
  }

  async logout(user: IUserProfile) {
    return await this.prisma.user.update({where: {id: user.id}, data: {token: null, rtoken: null}});
  }
}
