import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserComponents } from '../user/user.components';
import { PrismaService } from 'src/common/prisma.service';
import { CustomError } from '../common.components';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({ usernameField: 'email' }); // use 'email' instead of 'username'
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await UserComponents.findUser(this.prisma, { email: email});
    if(!user) throw new CustomError("Email not found", 404);
    if (!(user.verify && user.verify.status))throw new CustomError("Please confirm your E-mail.", 400); // NestJS style error handling
    if (user.status === "block") throw new CustomError("บัญชีของคุณถูกระงับการใช้งาน กรุณาติดต่อ บริษัท ไอแอพพ์ เทคโนโลยี จำกัด", 403); // NestJS style error handling
    if (!(await bcrypt.compare(password, user.password))) throw new CustomError("Password is incorrect", 401);
    return user; // Passport attaches the user to the request object
  }
}
