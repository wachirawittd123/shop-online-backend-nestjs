import { PrismaService } from 'src/common/prisma.service';
declare const LocalStrategy_base: new (...args: any) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly prisma;
    constructor(prisma: PrismaService);
    validate(email: string, password: string): Promise<any>;
}
export {};
