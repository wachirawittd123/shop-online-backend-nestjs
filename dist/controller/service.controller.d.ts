import { ICreateService, IQuerys, IResultController, IUpdateService } from 'src/interface';
import { ServiceCategoryService } from 'src/service';
export declare class ServiceCategoryController {
    private serviceCategoryService;
    constructor(serviceCategoryService: ServiceCategoryService);
    services(args: IQuerys, authToken: string): Promise<IResultController>;
    service(id: string, authToken: string): Promise<IResultController>;
    createService(args: ICreateService, authToken: string): Promise<IResultController>;
    updateService(id: string, args: IUpdateService, authToken: string): Promise<IResultController>;
    deleteService(id: string, authToken: string): Promise<IResultController>;
}
