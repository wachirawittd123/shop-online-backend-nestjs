import { Controller, Post, UseGuards, Request, Headers } from '@nestjs/common';
import { AuthService } from '../service/auth/auth.service';
import { LocalAuthGuard } from '../service/auth/guard/local-auth';
import { IResultController, IUserProfile } from 'src/interface';
import { CommonComponents } from 'src/service/common.components';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req): Promise<IResultController> {
    try { 
        console.log("user=========>",req.user)
        const result = await this.authService.login(req.user);
        return { message: "Login success", data: result, status_code: 200 };
    } catch (error) {
        return { message: error?.message, status_code: error?.statusCode || 400 };
    }
  }
  @Post('/logout')
  async logout(@Headers('authorization') authToken: string): Promise<IResultController> {
    try { 
        const user: IUserProfile | any = await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin", "consumer"]})
        await this.authService.logout(user);
        return { message: "Logout success", data: {}, status_code: 200 };
    } catch (error) {
        return { message: error?.message, status_code: error?.statusCode || 400 };
    }
  }

}