import { IHashedPassword, IUser, IUserProfile, IVerifyJWT } from 'src/interface';
export declare class CommonComponents {
    static randCode(): string;
    static hashedPassword(password: string): Promise<IHashedPassword>;
    static comparePassword(password: string, hashedPassword: string): Promise<boolean>;
    static verifyJWT({ token, roles }: IVerifyJWT): object | string;
    static signToken(data: IUserProfile, remember?: boolean): string;
    static refreshToken(data: IUser): Promise<string>;
}
export declare class CustomError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number);
}
