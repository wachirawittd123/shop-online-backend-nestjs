import { ICreateCategory, IQuerys, IResultController, IUpdateCategory } from 'src/interface';
import { CategoryService } from 'src/service';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    categories(args: IQuerys, authToken: string): Promise<IResultController>;
    categorie(id: string, authToken: string): Promise<IResultController>;
    createCategory(args: ICreateCategory, authToken: string): Promise<IResultController>;
    updateCategory(id: string, args: IUpdateCategory, authToken: string): Promise<IResultController>;
}
