import { ICreateNewParliamentUser, ICreateNewUser, ICreateUserVerify, IHandleExistingUser, IQuerys, ISendVerifyEmail, IUpdateUserVerify, IUser, IUserProfile } from 'src/interface';
import { PrismaService } from '../../common/prisma.service';
export declare class UserComponents {
    constructor();
    static genUserQuery(args: IQuerys): IQuerys | any;
    static findUser(prisma: PrismaService, where: any): Promise<IUser | any>;
    static getProfile(prisma: PrismaService, where: any): Promise<IUserProfile | any>;
    static getParliamentUserCount(prisma: PrismaService): Promise<number>;
    static handleExistingUser({ prisma, checkUser, email }: IHandleExistingUser): Promise<void>;
    static createNewParliamentUser({ prisma, email, password, phone, name }: ICreateNewParliamentUser): Promise<any>;
    static createNewUser({ prisma, email, password, phone, name }: ICreateNewUser): Promise<any>;
    static sendVerifyEmail({ prisma, email }: ISendVerifyEmail): Promise<any>;
    static createUserVerify({ prisma, code, userId, status }: ICreateUserVerify): Promise<any>;
    static updateUserVerify({ prisma, userId, code }: IUpdateUserVerify): Promise<any>;
}
