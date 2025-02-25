import { PrismaService } from '../../common/prisma.service';
import { ICreateService, IGetService, IQuerys, IService, IUpdateService, IUserProfile } from 'src/interface';
export declare class ServiceCategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getServices(args: IQuerys): Promise<IService[] | any>;
    getService(args: IGetService): Promise<IService | any>;
    createService(args: ICreateService, user: IUserProfile): Promise<IService | any>;
    updateService(args: IUpdateService, user: IUserProfile): Promise<IService | any>;
    deleteService(args: IGetService): Promise<IService | any>;
}
