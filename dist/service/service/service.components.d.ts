import { PrismaService } from "src/common/prisma.service";
import { IGetService, IQuerys, IService } from "src/interface";
export declare class ServiceComponents {
    constructor();
    static genServiceQuery(args: IQuerys): IQuerys | any;
    static findService(prisma: PrismaService, where: IGetService): Promise<IService | any>;
}
