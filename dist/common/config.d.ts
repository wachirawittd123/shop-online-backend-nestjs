import { ISendEmail } from 'src/interface';
export declare class ConfigService {
    constructor();
    static configureMiddleware: (app: any) => void;
    static sendEmail(msg: ISendEmail): Promise<void>;
}
