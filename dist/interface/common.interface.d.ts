export interface IQuerys {
    query?: string;
    where?: object;
    sort?: string;
    skip?: number;
    limit: number;
}
export interface IHashedPassword {
    newPassword: string;
    salt: string;
}
export interface IVerifyEmailFormat {
    title: string;
    description: string;
    subTitle: string;
    uri?: string;
    buttonText?: string;
    endCredit?: boolean;
    unsubText?: string;
    userEmail?: any;
}
export interface ISendEmail {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html: string;
}
export interface IVerifyJWT {
    token: string;
    roles?: string[];
}
