import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma.service";
import { IGetPricing, IGetService, IPricing, IQuerys, IService } from "src/interface";

@Injectable()
export class PricingComponents {
    constructor() {}
    static genPricingQuery(args: IQuerys): IQuerys| any {
        let where: any = {}
        if (args.query && args.query?.toString().length > 0) {
            where = {
                ...args.where,
                OR: [
                    { price: { contains: args.query, mode: "insensitive" } },
                    { icPerPrice: { contains: args.query, mode: "insensitive" } },
                    { validatePeriod: { contains: args.query, mode: "insensitive" } },
                ],
            }
        }
        return where
    }
    static async findPricing(prisma: PrismaService, where: IGetPricing): Promise<IPricing | any> {
        return await prisma.pricing.findFirst({where, include: {createdByUser: true, updatedByUser: true}});
    }
}