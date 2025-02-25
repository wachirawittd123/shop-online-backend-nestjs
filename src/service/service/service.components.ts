import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma.service";
import { IGetService, IQuerys, IService } from "src/interface";

@Injectable()
export class ServiceComponents {
    constructor() {}
    static genServiceQuery(args: IQuerys): IQuerys| any {
        let where: any = {}
        if (args.query && args.query?.toString().length > 0) {
            where = {
                ...where,
                OR: [
                    { name: { contains: args.query, mode: "insensitive" } },
                    { description: { contains: args.query, mode: "insensitive" } },
                ],
            }
        }
        return where
    }
    static async findService(prisma: PrismaService, where: IGetService): Promise<IService | any> {
        return await prisma.service.findFirst({where});
    }
}