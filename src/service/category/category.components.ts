import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma.service";
import { ICategory, IGetCategory, IQuerys } from "src/interface";

@Injectable()
export class CategoryComponents {
    constructor() {}
    static genCategoryQuery(args: IQuerys): IQuerys| any {
        let where: any = {}
        if (args.query && args.query?.toString().length > 0) {
            where = {
                ...where,
                OR: [
                    { categoriesName: { contains: args.query, mode: "insensitive" } },
                ],
            }
        }
        return where
    }
    static async findCategory(prisma: PrismaService, where: IGetCategory): Promise<ICategory | any> {
        return await prisma.category.findFirst({where});
    }
}