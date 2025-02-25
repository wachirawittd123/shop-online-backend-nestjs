import { ICreatePricing, IQuerys, IUpdatePricing } from 'src/interface';
import { PricingService } from 'src/service';
import { Response } from 'express';
export declare class PricingController {
    private pricingService;
    constructor(pricingService: PricingService);
    pricings(args: IQuerys, authToken: string, res: Response): Promise<Response>;
    pricing(id: string, authToken: string, res: Response): Promise<Response>;
    createPricing(args: ICreatePricing, authToken: string, res: Response): Promise<Response>;
    updatePricing(id: string, args: IUpdatePricing, authToken: string, res: Response): Promise<Response>;
    deletePricing(id: string, authToken: string, res: Response): Promise<Response>;
}
