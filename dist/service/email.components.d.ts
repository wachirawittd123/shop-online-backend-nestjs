import { IVerifyEmailFormat } from '../interface/common.interface';
export declare class EmailComponents {
    static randCode(): string;
    static formatVerifyEmail({ title, description, subTitle, uri, buttonText, endCredit, unsubText, userEmail }: IVerifyEmailFormat): string;
}
