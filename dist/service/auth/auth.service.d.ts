import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { PrismaService } from 'src/common/prisma.service';
export declare class AuthService {
    private jwtService;
    private userService;
    private readonly prisma;
    constructor(jwtService: JwtService, userService: UserService, prisma: PrismaService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<any>;
}
