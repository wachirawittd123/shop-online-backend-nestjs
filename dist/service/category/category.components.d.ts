import { PrismaService } from "src/common/prisma.service";
import { ICategory, IGetCategory, IQuerys } from "src/interface";
export declare class CategoryComponents {
    constructor();
    static genCategoryQuery(args: IQuerys): IQuerys | any;
    static findCategory(prisma: PrismaService, where: IGetCategory): Promise<ICategory | any>;
}
