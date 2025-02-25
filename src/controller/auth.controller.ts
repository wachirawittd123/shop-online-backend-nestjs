import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from '../service/auth/auth.service';
import { LocalAuthGuard } from '../service/auth/guard/local-auth';
import { IResultController } from 'src/interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req): Promise<IResultController> {
    try { 
        const result = await this.authService.login(req.user);
        return { message: "Login success", data: result, status_code: 200 };
    } catch (error) {
        return { message: error?.message, status_code: error?.statusCode || 400 };
    }
  }

}