import { IPwd, IQuerys, IResetPwd, ISendVerifyEmail, ISignup, IUpdateUserVerify, IUser, IUserProfile } from 'src/interface';
import { PrismaService } from '../../common/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUsers(args: IQuerys): Promise<{
        data: IUser[];
        total: number;
        totalPages: number;
    }>;
    signup(data: ISignup): Promise<any>;
    sendVerifyEmail(data: ISendVerifyEmail): Promise<any>;
    verifyEmail(data: IUpdateUserVerify): Promise<any>;
    forgetPwd(data: ISendVerifyEmail): Promise<any>;
    resetPwd(data: IResetPwd): Promise<IUser | any>;
    changePwd(data: IPwd, user: IUserProfile): Promise<IUser | any>;
}
