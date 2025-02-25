
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { ICategory, ICreateCategory, IGetCategory, IQuerys, IUpdateCategory, IUserProfile } from 'src/interface';
import { CategoryComponents } from './category.components';

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
  async createCategory(args: ICreateCategory, user: IUserProfile): Promise<ICategory | any> {
    const categoryName = await CategoryComponents.findCategory(this.prisma, {categoriesName: args.categoriesName});
    if(categoryName) throw new Error("Category name already exists");
    return await this.prisma.category.create({data: {...args, createdBy: user.id, updatedBy: user.id}});
  }
  async updateCategory(args: IUpdateCategory, user: IUserProfile): Promise<ICategory | any> {
    const category = await this.getCategory({id: args.id});
    if(!category) throw new Error("Category not found");
    const categoryName = await CategoryComponents.findCategory(this.prisma, {categoriesName: args.categoriesName, id: {not: args.id}});
    if(categoryName) throw new Error("Category name already exists");
    return await this.prisma.category.update({where: {id: args.id}, data: {...args, updatedBy: user.id}});
  }
  async deleteCategory(args: IGetCategory): Promise<ICategory | any> {
    const category = await this.getCategory({id: args.id});
    if(!category) throw new Error("Category not found");
    return await this.prisma.category.delete({where: {id: args.id}});
  }
}
