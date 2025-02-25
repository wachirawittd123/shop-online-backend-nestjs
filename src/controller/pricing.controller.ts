import { Controller, Post, Body, Get, Headers, Query, Param, Put, Delete, Res } from '@nestjs/common';
import { ICreatePricing, IQuerys, IUpdatePricing, IUserProfile } from 'src/interface';
import { CommonComponents } from 'src/service/common.components';
import { PricingService } from 'src/service';
import { Response } from 'express';

@Controller('pricing')
export class PricingController {
  constructor(private pricingService: PricingService) {}

  @Get('/')
  async pricings(@Query() args: IQuerys, @Headers('authorization') authToken: string, @Res() res: Response): Promise<Response> {
    try { 
        await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin", "consumer"]})
        const result = await this.pricingService.getPricings(args);
        return CommonComponents.throwResponse(result, "Query services success", res)
    } catch (error) {
        return CommonComponents.throwErrorResponse(error, res)
    }
  }
  @Get('/:id')
  async pricing(@Param('id') id: string, @Headers('authorization') authToken: string, @Res() res: Response): Promise<Response> {
    try { 
        await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin", "consumer"]})
        const result = await this.pricingService.getPricing({id});
        return CommonComponents.throwResponse(result, "Query service success", res)
    } catch (error) {
        return CommonComponents.throwErrorResponse(error, res)
    }
  }
  @Post('/')
  async createPricing(@Body() args: ICreatePricing, @Headers('authorization') authToken: string, @Res() res: Response): Promise<Response> {
    try { 
        const user: IUserProfile | any = await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin"]})
        const result = await this.pricingService.createPricing(args, user);
        return CommonComponents.throwResponse(result, "Create pricing success", res)
    } catch (error) {
        return CommonComponents.throwErrorResponse(error, res)
    }
  }
  @Put('/:id')
  async updatePricing(@Param('id') id: string, @Body() args: IUpdatePricing, @Headers('authorization') authToken: string, @Res() res: Response): Promise<Response> {
    try { 
        const user: IUserProfile | any = await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin"]})
        const result = await this.pricingService.updatePricing({...args, id: id}, user);
        return CommonComponents.throwResponse(result, "Update pricing success", res)
    } catch (error) {
        return CommonComponents.throwErrorResponse(error, res)
    }
  }
  @Delete('/:id')
  async deletePricing(@Param('id') id: string, @Headers('authorization') authToken: string, @Res() res: Response): Promise<Response> {
    try { 
        await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin"]})
        const result = await this.pricingService.deletePricing({id});
        return CommonComponents.throwResponse(result, "Delete pricing success", res)
    } catch (error) {
        return CommonComponents.throwErrorResponse(error, res)
    }
  }
}