import { PrismaService } from "src/common/prisma.service";
import { IGetPricing, IPricing, IQuerys } from "src/interface";
export declare class PricingComponents {
    constructor();
    static genPricingQuery(args: IQuerys): IQuerys | any;
    static findPricing(prisma: PrismaService, where: IGetPricing): Promise<IPricing | any>;
}
