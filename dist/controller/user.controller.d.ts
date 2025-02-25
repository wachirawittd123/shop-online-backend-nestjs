import { UserService } from '../service/user/user.service';
import { IPwd, IQuerys, IResetPwd, ISendVerifyEmail, ISignup, IUpdateUserVerify } from 'src/interface';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(args: IQuerys, authToken: string, res: Response): Promise<Response>;
    signup(data: ISignup, res: Response): Promise<Response>;
    sendVerifyEmail(data: ISendVerifyEmail, res: Response): Promise<Response>;
    verifyEmail(data: IUpdateUserVerify, res: Response): Promise<Response>;
    forgetPwd(data: ISendVerifyEmail, res: Response): Promise<Response>;
    resetPwd(data: IResetPwd, res: Response): Promise<Response>;
    changePwd(data: IPwd, authToken: string, res: Response): Promise<Response>;
}
