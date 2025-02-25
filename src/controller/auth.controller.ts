import { Controller, Post, UseGuards, Request, Headers, Res } from '@nestjs/common';
import { AuthService } from '../service/auth/auth.service';
import { LocalAuthGuard } from '../service/auth/guard/local-auth';
import { IUserProfile } from 'src/interface';
import { CommonComponents } from 'src/service/common.components';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Res() res: Response): Promise<Response> {
    try { 
        const result = await this.authService.login(req.user);
        return CommonComponents.throwResponse(result, "Login success", res)
    } catch (error) {
        return CommonComponents.throwErrorResponse(error, res)
    }
  }
  @Post('/logout')
  async logout(@Headers('authorization') authToken: string, @Res() res: Response): Promise<Response> {
    try { 
        const user: IUserProfile | any = await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin", "consumer"]})
        await this.authService.logout(user);
        return CommonComponents.throwResponse({}, "Logout success", res)
    } catch (error) {
        return CommonComponents.throwErrorResponse(error, res)
    }
  }

}