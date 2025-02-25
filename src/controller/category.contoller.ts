import { Controller, Post, Body, Get, Headers, Query, Param, Put } from '@nestjs/common';
import { ICreateCategory, IQuerys, IResultController, IUpdateCategory, IUserProfile } from 'src/interface';
import { CategoryService } from 'src/service';
import { CommonComponents } from 'src/service/common.components';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('/')
  async categories(@Query() args: IQuerys, @Headers('authorization') authToken: string): Promise<IResultController> {
    try { 
        await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin", "consumer"]})
        const result = await this.categoryService.getCategories(args);
        return { message: "Query categories success", data: result, status_code: 200 };
    } catch (error) {
        return { message: error?.message, status_code: error?.statusCode || 400 };
    }
  }
  @Get('/:id')
  async categorie(@Param('id') id: string, @Headers('authorization') authToken: string): Promise<IResultController> {
    try { 
        await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin", "consumer"]})
        const result = await this.categoryService.getCategory({id});
        return { message: "Query category success", data: result, status_code: 200 };
    } catch (error) {
        return { message: error?.message, status_code: error?.statusCode || 400 };
    }
  }
  @Post('/')
  async createCategory(@Body() args: ICreateCategory, @Headers('authorization') authToken: string): Promise<IResultController> {
    try { 
        const user: IUserProfile | any = await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin", "consumer"]})
        const result = await this.categoryService.createCategory(args, user);
        return { message: "Create category success", data: result, status_code: 200 };
    } catch (error) {
        return { message: error?.message, status_code: error?.statusCode || 400 };
    }
  }
  @Put('/:id')
  async updateCategory(@Param('id') id: string, @Body() args: IUpdateCategory, @Headers('authorization') authToken: string): Promise<IResultController> {
    try { 
        const user: IUserProfile | any = await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin", "consumer"]})
        const result = await this.categoryService.updateCategory({...args, id: id}, user);
        return { message: "Update category success", data: result, status_code: 200 };
    } catch (error) {
        return { message: error?.message, status_code: error?.statusCode || 400 };
    }
  }

}