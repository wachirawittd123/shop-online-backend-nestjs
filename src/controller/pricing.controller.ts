import { Controller, Post, Body, Get, Headers, Query, Param, Put, Delete } from '@nestjs/common';
import { ICreatePricing, IQuerys, IResultController, IUpdatePricing, IUserProfile } from 'src/interface';
import { CommonComponents } from 'src/service/common.components';
import { PricingService } from 'src/service';

@Controller('pricing')
export class PricingController {
  constructor(private pricingService: PricingService) {}

  @Get('/')
  async pricings(@Query() args: IQuerys, @Headers('authorization') authToken: string): Promise<IResultController> {
    try { 
        await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin", "consumer"]})
        const result = await this.pricingService.getPricings(args);
        return { message: "Query services success", data: result, status_code: 200 };
    } catch (error) {
        return { message: error?.message, status_code: error?.statusCode || 400 };
    }
  }
  @Get('/:id')
  async pricing(@Param('id') id: string, @Headers('authorization') authToken: string): Promise<IResultController> {
    try { 
        await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin", "consumer"]})
        const result = await this.pricingService.getPricing({id});
        return { message: "Query service success", data: result, status_code: 200 };
    } catch (error) {
        return { message: error?.message, status_code: error?.statusCode || 400 };
    }
  }
  @Post('/')
  async createPricing(@Body() args: ICreatePricing, @Headers('authorization') authToken: string): Promise<IResultController> {
    try { 
        const user: IUserProfile | any = await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin"]})
        const result = await this.pricingService.createPricing(args, user);
        return { message: "Create pricing success", data: result, status_code: 200 };
    } catch (error) {
        return { message: error?.message, status_code: error?.statusCode || 400 };
    }
  }
  @Put('/:id')
  async updatePricing(@Param('id') id: string, @Body() args: IUpdatePricing, @Headers('authorization') authToken: string): Promise<IResultController> {
    try { 
        const user: IUserProfile | any = await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin"]})
        const result = await this.pricingService.updatePricing({...args, id: id}, user);
        return { message: "Update pricing success", data: result, status_code: 200 };
    } catch (error) {
        return { message: error?.message, status_code: error?.statusCode || 400 };
    }
  }
  @Delete('/:id')
  async deletePricing(@Param('id') id: string, @Headers('authorization') authToken: string): Promise<IResultController> {
    try { 
        await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin"]})
        const result = await this.pricingService.deletePricing({id});
        return { message: "Delete pricing success", data: result, status_code: 200 };
    } catch (error) {
        return { message: error?.message, status_code: error?.statusCode || 400 };
    }
  }
}