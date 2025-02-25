import { AuthService } from '../service/auth/auth.service';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any, res: Response): Promise<Response>;
    logout(authToken: string, res: Response): Promise<Response>;
}
