import { Body, Controller, Get, Post, Query, Put, Headers, Res } from '@nestjs/common';
import { UserService } from '../service/user/user.service';
import { IPwd, IQuerys, IResetPwd, ISendVerifyEmail, ISignup, IUpdateUserVerify, IUserProfile } from 'src/interface';
import { CommonComponents } from 'src/service/common.components';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getUsers(@Query() args: IQuerys, @Headers('authorization') authToken: string, @Res() res: Response): Promise<Response> {
    try {
      await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin"]})
      const result = await this.userService.getUsers(args);
      return CommonComponents.throwResponse(result, "Get users success", res)
    } catch (error) {
      return CommonComponents.throwErrorResponse(error, res)
    }
  }
  @Post('/signup')
  async signup(@Body() data: ISignup, @Res() res: Response): Promise<Response> {
    try {
      const result = await this.userService.signup(data);
      return CommonComponents.throwResponse(result, "create user success", res)
    } catch (error) {
      return CommonComponents.throwErrorResponse(error, res)
    }
  }
  @Put('/send-verify-email')
  async sendVerifyEmail(@Body() data: ISendVerifyEmail, @Res() res: Response): Promise<Response> {
    try {
      const result = await this.userService.sendVerifyEmail(data);
      return CommonComponents.throwResponse(result, "send verify email success", res)
    } catch (error) {
      return CommonComponents.throwErrorResponse(error, res)
    }
  }
  @Put('/verify-email')
  async verifyEmail(@Body() data: IUpdateUserVerify, @Res() res: Response): Promise<Response> {
    try {
      const result = await this.userService.verifyEmail(data);
      return CommonComponents.throwResponse(result, "update verify email success", res)
    } catch (error) {
      return CommonComponents.throwErrorResponse(error, res)
    }
  }
  @Put('/forgot-password')
  async forgetPwd(@Body() data: ISendVerifyEmail, @Res() res: Response): Promise<Response> {
    try {
      const result = await this.userService.forgetPwd(data);
      return CommonComponents.throwResponse(result, "update verify email success", res)
    } catch (error) {
      return CommonComponents.throwErrorResponse(error, res)
    }
  }
  @Put('/reset-password')
  async resetPwd(@Body() data: IResetPwd, @Res() res: Response): Promise<Response> {
    try {
      const result = await this.userService.resetPwd(data);
      return CommonComponents.throwResponse(result, "update verify email success", res)
    } catch (error) {
      return CommonComponents.throwErrorResponse(error, res)
    }
  }
  @Put('/change-password')
  async changePwd(@Body() data: IPwd, @Headers('authorization') authToken: string, @Res() res: Response): Promise<Response> {
    try {
      const user: IUserProfile | any = await CommonComponents.verifyJWT({token: authToken})
      const result = await this.userService.changePwd(data, user);
      return CommonComponents.throwResponse(result, "update verify email success", res)
    } catch (error) {
      return CommonComponents.throwErrorResponse(error, res)
    }
  }
}

