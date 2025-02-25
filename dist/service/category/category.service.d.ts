import { PrismaService } from '../../common/prisma.service';
import { ICategory, ICreateCategory, IGetCategory, IQuerys, IUpdateCategory, IUserProfile } from 'src/interface';
export declare class CategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getCategories(args: IQuerys): Promise<ICategory[] | any>;
    getCategory(args: IGetCategory): Promise<ICategory | any>;
    createCategory(args: ICreateCategory, user: IUserProfile): Promise<ICategory | any>;
    updateCategory(args: IUpdateCategory, user: IUserProfile): Promise<ICategory | any>;
    deleteCategory(args: IGetCategory): Promise<ICategory | any>;
}
