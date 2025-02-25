import { Body, Controller, Get, Post, Query, Put, Headers } from '@nestjs/common';
import { UserService } from '../service/user/user.service';
import { IPwd, IQuerys, IResetPwd, IResultController, ISendVerifyEmail, ISignup, IUpdateUserVerify, IUserProfile } from 'src/interface';
import { CommonComponents } from 'src/service/common.components';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getUsers(@Query() args: IQuerys, @Headers('authorization') authToken: string): Promise<IResultController> {
    try {
      await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin"]})
      const result = await this.userService.getUsers(args);
      return { message: "Get users success", data: result, status_code: 200 };
    } catch (error) {
      return { message: error?.message, status_code: error?.statusCode || 400 };
    }
  }
  @Post('/signup')
  async signup(@Body() data: ISignup): Promise<IResultController> {
    try {
      const result = await this.userService.signup(data);
      return { message: "create user success", data: result, status_code: 200 };
    } catch (error) {
      return { message: error?.message, status_code: error?.statusCode || 400 };
    }
  }
  @Put('/send-verify-email')
  async sendVerifyEmail(@Body() data: ISendVerifyEmail): Promise<IResultController> {
    try {
      const result = await this.userService.sendVerifyEmail(data);
      return { message: "send verify email success", data: result, status_code: 200 };
    } catch (error) {
      return { message: error?.message, status_code: error?.statusCode || 400 };
    }
  }
  @Put('/verify-email')
  async verifyEmail(@Body() data: IUpdateUserVerify): Promise<IResultController> {
    try {
      const result = await this.userService.verifyEmail(data);
      return { message: "update verify email success", data: result, status_code: 200 };
    } catch (error) {
      return { message: error?.message, status_code: error?.statusCode || 400 };
    }
  }
  @Put('/forgot-password')
  async forgetPwd(@Body() data: ISendVerifyEmail): Promise<IResultController> {
    try {
      const result = await this.userService.forgetPwd(data);
      return { message: "update verify email success", data: result, status_code: 200 };
    } catch (error) {
      return { message: error?.message, status_code: error?.statusCode || 400 };
    }
  }
  @Put('/reset-password')
  async resetPwd(@Body() data: IResetPwd): Promise<IResultController> {
    try {
      const result = await this.userService.resetPwd(data);
      return { message: "update verify email success", data: result, status_code: 200 };
    } catch (error) {
      return { message: error?.message, status_code: error?.statusCode || 400 };
    }
  }
  @Put('/change-password')
  async changePwd(@Body() data: IPwd, @Headers('authorization') authToken: string): Promise<IResultController> {
    try {
      const user: IUserProfile | any = await CommonComponents.verifyJWT({token: authToken})
      const result = await this.userService.changePwd(data, user);
      return { message: "update verify email success", data: result, status_code: 200 };
    } catch (error) {
      return { message: error?.message, status_code: error?.statusCode || 400 };
    }
  }
}

