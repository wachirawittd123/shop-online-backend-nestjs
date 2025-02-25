import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma.service";
import { IEndpoint, IGetEndpoint, IQuerys } from "src/interface";

@Injectable()
export class EndpointComponents {
    constructor() {}
    static genEndpointQuery(args: IQuerys): IQuerys | any {
        let where: any = {};
        let whereArgs: any = args?.where ? JSON.parse(args?.where) : {};
    
        if (args.query && args.query.toString().length > 0) {
            const numericQuery = Number(args.query);
            where = {
                ...where,
                OR: [
                    { name: { contains: args.query, mode: "insensitive" } },
                    { description: { contains: args.query, mode: "insensitive" } },
                    { requestUrl: { contains: args.query, mode: "insensitive" } },
                    { requestMethod: { contains: args.query, mode: "insensitive" } },
                    isNaN(numericQuery) ? {} : { creditPerRequest: { equals: numericQuery } }
                ].filter(condition => Object.keys(condition).length > 0) // Remove empty conditions
            };
        }
    
        if (whereArgs?.apiServiceId) {
            where = {
                ...where,
                apiServiceId: whereArgs?.apiServiceId
            };
        }
    
        return where;
    }
    static async findEndpoint(prisma: PrismaService, where: IGetEndpoint): Promise<IEndpoint | any> {
        return await prisma.endpoint.findFirst({where, include: {service: true}});
    }
}