import { UserService } from '../service/user/user.service';
import { IPwd, IQuerys, IResetPwd, IResultController, ISendVerifyEmail, ISignup, IUpdateUserVerify } from 'src/interface';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(args: IQuerys, authToken: string): Promise<IResultController>;
    signup(data: ISignup): Promise<IResultController>;
    sendVerifyEmail(data: ISendVerifyEmail): Promise<IResultController>;
    verifyEmail(data: IUpdateUserVerify): Promise<IResultController>;
    forgetPwd(data: ISendVerifyEmail): Promise<IResultController>;
    resetPwd(data: IResetPwd): Promise<IResultController>;
    changePwd(data: IPwd, authToken: string): Promise<IResultController>;
}
