import { PrismaService } from '../../common/prisma.service';
import { ICreatePricing, IGetPricing, IPricing, IQuerys, IUpdatePricing, IUserProfile } from 'src/interface';
export declare class PricingService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getPricings(args: IQuerys): Promise<IPricing[] | any>;
    getPricing(args: IGetPricing): Promise<IPricing | any>;
    createPricing(args: ICreatePricing, user: IUserProfile): Promise<IPricing | any>;
    updatePricing(args: IUpdatePricing, user: IUserProfile): Promise<IPricing | any>;
    deletePricing(args: IGetPricing): Promise<IPricing | any>;
}
