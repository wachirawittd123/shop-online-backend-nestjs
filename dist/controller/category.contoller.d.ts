import { ICreateCategory, IQuerys, IUpdateCategory } from 'src/interface';
import { CategoryService } from 'src/service';
import { Response } from 'express';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    categories(args: IQuerys, authToken: string, res: Response): Promise<Response>;
    categorie(id: string, authToken: string, res: Response): Promise<Response>;
    createCategory(args: ICreateCategory, authToken: string, res: Response): Promise<Response>;
    updateCategory(id: string, args: IUpdateCategory, authToken: string, res: Response): Promise<Response>;
}
