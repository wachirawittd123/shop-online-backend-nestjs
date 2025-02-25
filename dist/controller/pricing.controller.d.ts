import { ICreatePricing, IQuerys, IResultController, IUpdatePricing } from 'src/interface';
import { PricingService } from 'src/service';
export declare class PricingController {
    private pricingService;
    constructor(pricingService: PricingService);
    pricings(args: IQuerys, authToken: string): Promise<IResultController>;
    pricing(id: string, authToken: string): Promise<IResultController>;
    createPricing(args: ICreatePricing, authToken: string): Promise<IResultController>;
    updatePricing(id: string, args: IUpdatePricing, authToken: string): Promise<IResultController>;
    deletePricing(id: string, authToken: string): Promise<IResultController>;
}
