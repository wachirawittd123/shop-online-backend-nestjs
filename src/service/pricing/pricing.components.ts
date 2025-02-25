import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma.service";
import { IGetPricing, IGetService, IPricing, IQuerys, IService } from "src/interface";

@Injectable()
export class PricingComponents {
    constructor() {}
    static genPricingQuery(args: IQuerys): IQuerys| any {
        let where: any = {}
        if (args.query && args.query?.toString().length > 0) {
            const numericQuery = Number(args.query);
            where = {
                ...where,
                OR: !isNaN(numericQuery) ? [
                    { price: { equals: numericQuery } },
                    { icPerPrice: { equals: numericQuery } },
                    { validatePeriod: { equals: numericQuery } },
                ].filter(condition => Object.keys(condition).length > 0)
                : []
            }
        }
        return where
    }
    static async findPricing(prisma: PrismaService, where: IGetPricing): Promise<IPricing | any> {
        return await prisma.pricing.findFirst({where, include: {createdByUser: true, updatedByUser: true}});
    }
}