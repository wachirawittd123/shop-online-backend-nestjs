import { Controller, Post, Body, Get, Headers, Query, Param, Put, Delete, Res } from '@nestjs/common';
import { ICreateService, IQuerys, IUpdateService, IUserProfile } from 'src/interface';
import { CommonComponents } from 'src/service/common.components';
import { ServiceCategoryService } from 'src/service';
import { Response } from 'express';

@Controller('service')
export class ServiceCategoryController {
  constructor(private serviceCategoryService: ServiceCategoryService) {}

  @Get('/')
  async services(@Query() args: IQuerys, @Headers('authorization') authToken: string, @Res() res: Response): Promise<Response> {
    try { 
        await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin", "consumer"]})
        const result = await this.serviceCategoryService.getServices(args);
        return CommonComponents.throwResponse(result, "Query services success", res)
    } catch (error) {
        return CommonComponents.throwErrorResponse(error, res)
    }
  }
  @Get('/:id')
  async service(@Param('id') id: string, @Headers('authorization') authToken: string, @Res() res: Response): Promise<Response> {
    try { 
        await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin", "consumer"]})
        const result = await this.serviceCategoryService.getService({id});
        return CommonComponents.throwResponse(result, "Query service success", res)
    } catch (error) {
        return CommonComponents.throwErrorResponse(error, res)
    }
  }
  @Post('/')
  async createService(@Body() args: ICreateService, @Headers('authorization') authToken: string, @Res() res: Response): Promise<Response> {
    try { 
        const user: IUserProfile | any = await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin"]})
        const result = await this.serviceCategoryService.createService(args, user);
        return CommonComponents.throwResponse(result, "Create service success", res)
    } catch (error) {
        return CommonComponents.throwErrorResponse(error, res)
    }
  }
  @Put('/:id')
  async updateService(@Param('id') id: string, @Body() args: IUpdateService, @Headers('authorization') authToken: string, @Res() res: Response): Promise<Response> {
    try { 
        const user: IUserProfile | any = await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin"]})
        const result = await this.serviceCategoryService.updateService({...args, id: id}, user);
        return CommonComponents.throwResponse(result, "Update service success", res)
    } catch (error) {
        return CommonComponents.throwErrorResponse(error, res)
    }
  }
  @Delete('/:id')
  async deleteService(@Param('id') id: string, @Headers('authorization') authToken: string, @Res() res: Response): Promise<Response> {
    try { 
        await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin"]})
        const result = await this.serviceCategoryService.deleteService({id});
        return CommonComponents.throwResponse(result, "Delete service success", res)
    } catch (error) {
        return CommonComponents.throwErrorResponse(error, res)
    }
  }
}