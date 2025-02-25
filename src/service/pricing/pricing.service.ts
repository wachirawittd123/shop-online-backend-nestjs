
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { ICreatePricing, IGetPricing, IPricing, IQuerys, IUpdatePricing, IUserProfile } from 'src/interface';
import { PricingComponents } from './pricing.components';
import { CustomError } from '../common.components';

@Injectable()
export class PricingService {
  constructor(private readonly prisma: PrismaService) {}

  async getPricings(args: IQuerys): Promise<IPricing[] | any> {
    const where = PricingComponents.genPricingQuery(args);
    return await this.prisma.pricing.findMany({where, include: {createdByUser: true, updatedByUser: true}});
  }
  async getPricing(args: IGetPricing): Promise<IPricing | any> {
    return await PricingComponents.findPricing(this.prisma, args);
  }
  async createPricing(args: ICreatePricing, user: IUserProfile): Promise<IPricing | any> {
    return await this.prisma.pricing.create({ data: {...args, createdBy: user.id, updatedBy: user.id}});
  }
  async updatePricing(args: IUpdatePricing, user: IUserProfile): Promise<IPricing | any> {
    const pricing = await PricingComponents.findPricing(this.prisma, {id: args.id});
    if(!pricing) throw new CustomError("Pricing not found", 400);
    return await this.prisma.pricing.update({where: {id: args.id}, data: {...args, updatedBy: user.id}});
  }
  async deletePricing(args: IGetPricing): Promise<IPricing | any> {
    const pricing = await PricingComponents.findPricing(this.prisma, {id: args.id});
    if(!pricing) throw new CustomError("Pricing not found", 400);
    return await this.prisma.pricing.delete({where: {id: args.id}});
  }
}
