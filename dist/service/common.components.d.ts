import { IHashedPassword, IUser, IUserProfile, IVerifyJWT } from 'src/interface';
import { Response } from 'express';
export declare class CommonComponents {
    static randCode(): string;
    static hashedPassword(password: string): Promise<IHashedPassword>;
    static comparePassword(password: string, hashedPassword: string): Promise<boolean>;
    static verifyJWT({ token, roles }: IVerifyJWT): Promise<object | string>;
    static signToken(data: IUserProfile, remember?: boolean): Promise<string>;
    static refreshToken(data: IUser): Promise<string>;
    static throwErrorResponse(error: any, res: Response): Promise<Response<any, Record<string, any>>>;
    static throwResponse(data: any, message: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare class CustomError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number);
}
