import { ICreateService, IQuerys, IUpdateService } from 'src/interface';
import { ServiceCategoryService } from 'src/service';
import { Response } from 'express';
export declare class ServiceCategoryController {
    private serviceCategoryService;
    constructor(serviceCategoryService: ServiceCategoryService);
    services(args: IQuerys, authToken: string, res: Response): Promise<Response>;
    service(id: string, authToken: string, res: Response): Promise<Response>;
    createService(args: ICreateService, authToken: string, res: Response): Promise<Response>;
    updateService(id: string, args: IUpdateService, authToken: string, res: Response): Promise<Response>;
    deleteService(id: string, authToken: string, res: Response): Promise<Response>;
}
