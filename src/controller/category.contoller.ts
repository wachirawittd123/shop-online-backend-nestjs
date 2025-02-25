import { Controller, Post, Body, Get, Headers, Query, Param, Put, Res } from '@nestjs/common';
import { ICreateCategory, IQuerys, IUpdateCategory, IUserProfile } from 'src/interface';
import { CategoryService } from 'src/service';
import { CommonComponents } from 'src/service/common.components';
import { Response } from 'express';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('/')
  async categories(@Query() args: IQuerys, @Headers('authorization') authToken: string, @Res() res: Response): Promise<Response> {
    try { 
        await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin", "consumer"]})
        const result = await this.categoryService.getCategories(args);
        return CommonComponents.throwResponse(result, "Query categories success", res)
    } catch (error) {
        return CommonComponents.throwErrorResponse(error, res)
    }
  }
  @Get('/:id')
    async categorie(@Param('id') id: string, @Headers('authorization') authToken: string, @Res() res: Response): Promise<Response> {
    try { 
        await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin", "consumer"]})
        const result = await this.categoryService.getCategory({id});
        return CommonComponents.throwResponse(result, "Query category success", res)
    } catch (error) {
        return CommonComponents.throwErrorResponse(error, res)
    }
  }
  @Post('/')
  async createCategory(@Body() args: ICreateCategory, @Headers('authorization') authToken: string, @Res() res: Response): Promise<Response> {
    try { 
        const user: IUserProfile | any = await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin", "consumer"]})
        const result = await this.categoryService.createCategory(args, user);
        return CommonComponents.throwResponse(result, "Create category success", res)
    } catch (error) {
        return CommonComponents.throwErrorResponse(error, res)
    }
  }
  @Put('/:id')
  async updateCategory(@Param('id') id: string, @Body() args: IUpdateCategory, @Headers('authorization') authToken: string, @Res() res: Response): Promise<Response> {
    try { 
        const user: IUserProfile | any = await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin", "consumer"]})
        const result = await this.categoryService.updateCategory({...args, id: id}, user);
        return CommonComponents.throwResponse(result, "Update category success", res)
    } catch (error) {
        return CommonComponents.throwErrorResponse(error, res)
    }
  }

}