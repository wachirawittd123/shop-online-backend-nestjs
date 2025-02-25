
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { ICategory, ICreateCategory, IGetCategory, IGetPageCategories, IQuerys, IUpdateCategory, IUserProfile } from 'src/interface';
import { CategoryComponents } from './category.components';
import { CustomError } from '../common.components';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategories(args: IQuerys): Promise<ICategory[] | any> {
    const where = CategoryComponents.genCategoryQuery(args);
    return await this.prisma.category.findMany({where});
  }
  async getCategory(args: IGetCategory): Promise<ICategory | any> {
    return await CategoryComponents.findCategory(this.prisma, args);
  }
  async getPageCategories(args: IQuerys): Promise<IGetPageCategories | any> {
    const where = CategoryComponents.genCategoryQuery(args);
    const total = await this.prisma.category.count({ where });
    const results = await this.prisma.category.findMany({
      where,
      include: {
        services: {  // ดึง Services ที่เกี่ยวข้องกับ Category
          include: { 
            endpoints: true // ดึง Endpoints ที่เกี่ยวข้องกับ Service
          }
        }
      },
      skip: Number(args.skip) || 0,
      take: Number(args.limit) || 20,
    });
    return {
      total,
      results,
    };
  }
  async createCategory(args: ICreateCategory, user: IUserProfile): Promise<ICategory | any> {
    const categoryName = await CategoryComponents.findCategory(this.prisma, {categoriesName: args.categoriesName});
    if(categoryName) throw new CustomError("Category name already exists", 400);
    return await this.prisma.category.create({data: {...args, createdBy: user.id, updatedBy: user.id}});
  }
  async updateCategory(args: IUpdateCategory, user: IUserProfile): Promise<ICategory | any> {
    const category = await this.getCategory({id: args.id});
    if(!category) throw new CustomError("Category not found", 400);
    const categoryName = await CategoryComponents.findCategory(this.prisma, {categoriesName: args.categoriesName, id: {not: args.id}});
    if(categoryName) throw new CustomError("Category name already exists", 400);
    return await this.prisma.category.update({where: {id: args.id}, data: {...args, updatedBy: user.id}});
  }
  async deleteCategory(args: IGetCategory): Promise<ICategory | any> {
    const category = await this.getCategory({id: args.id});
    if(!category) throw new CustomError("Category not found", 400);
    return await this.prisma.category.delete({where: {id: args.id}});
  }
}
