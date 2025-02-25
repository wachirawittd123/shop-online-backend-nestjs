import { AuthService } from '../service/auth/auth.service';
import { IResultController } from 'src/interface';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<IResultController>;
    logout(authToken: string): Promise<IResultController>;
}
