import { Controller, Post, Body, Get, Headers, Query, Param, Put, Delete } from '@nestjs/common';
import { ICreateService, IQuerys, IResultController, IUpdateService, IUserProfile } from 'src/interface';
import { CommonComponents } from 'src/service/common.components';
import { ServiceCategoryService } from 'src/service';

@Controller('service')
export class ServiceCategoryController {
  constructor(private serviceCategoryService: ServiceCategoryService) {}

  @Get('/')
  async services(@Query() args: IQuerys, @Headers('authorization') authToken: string): Promise<IResultController> {
    try { 
        await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin", "consumer"]})
        const result = await this.serviceCategoryService.getServices(args);
        return { message: "Query services success", data: result, status_code: 200 };
    } catch (error) {
        return { message: error?.message, status_code: error?.statusCode || 400 };
    }
  }
  @Get('/:id')
  async service(@Param('id') id: string, @Headers('authorization') authToken: string): Promise<IResultController> {
    try { 
        await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin", "consumer"]})
        const result = await this.serviceCategoryService.getService({id});
        return { message: "Query service success", data: result, status_code: 200 };
    } catch (error) {
        return { message: error?.message, status_code: error?.statusCode || 400 };
    }
  }
  @Post('/')
  async createService(@Body() args: ICreateService, @Headers('authorization') authToken: string): Promise<IResultController> {
    try { 
        const user: IUserProfile | any = await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin"]})
        const result = await this.serviceCategoryService.createService(args, user);
        return { message: "Create service success", data: result, status_code: 200 };
    } catch (error) {
        return { message: error?.message, status_code: error?.statusCode || 400 };
    }
  }
  @Put('/:id')
  async updateService(@Param('id') id: string, @Body() args: IUpdateService, @Headers('authorization') authToken: string): Promise<IResultController> {
    try { 
        const user: IUserProfile | any = await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin"]})
        const result = await this.serviceCategoryService.updateService({...args, id: id}, user);
        return { message: "Update service success", data: result, status_code: 200 };
    } catch (error) {
        return { message: error?.message, status_code: error?.statusCode || 400 };
    }
  }
  @Delete('/:id')
  async deleteService(@Param('id') id: string, @Headers('authorization') authToken: string): Promise<IResultController> {
    try { 
        await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin"]})
        const result = await this.serviceCategoryService.deleteService({id});
        return { message: "Delete service success", data: result, status_code: 200 };
    } catch (error) {
        return { message: error?.message, status_code: error?.statusCode || 400 };
    }
  }
}