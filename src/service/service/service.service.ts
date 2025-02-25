
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { ICreateService, IGetService, IQuerys, IService, IUpdateService, IUserProfile } from 'src/interface';
import { ServiceComponents } from './service.components';
import { CategoryComponents } from '../category/category.components';
import { CustomError } from '../common.components';

@Injectable()
export class ServiceCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getServices(args: IQuerys): Promise<IService[] | any> {
    const where = ServiceComponents.genServiceQuery(args);
    return await this.prisma.service.findMany({where});
  }
  async getService(args: IGetService): Promise<IService | any> {
    return await ServiceComponents.findService(this.prisma, args);
  }
  async createService(args: ICreateService, user: IUserProfile): Promise<IService | any> {
    const category = await CategoryComponents.findCategory(this.prisma, {id: args.apiCategoriesId});
    if(!category) throw new CustomError("Category not found", 400);
    return await this.prisma.service.create({ data: {...args, createdBy: user.id, updatedBy: user.id}});
  }
  async updateService(args: IUpdateService, user: IUserProfile): Promise<IService | any> {
    const service = await this.getService({id: args.id});
    if(!service) throw new CustomError("Service not found", 400);
    const category = await CategoryComponents.findCategory(this.prisma, {id: args.apiCategoriesId});
    if(!category) throw new CustomError("Category not found", 400);
    return await this.prisma.service.update({where: {id: args.id}, data: {...args, updatedBy: user.id}});
  }
  async deleteService(args: IGetService): Promise<IService | any> {
    const service = await this.getService({id: args.id});
    if(!service) throw new CustomError("Service not found", 400);
    return await this.prisma.service.delete({where: {id: args.id}});
  }
}
