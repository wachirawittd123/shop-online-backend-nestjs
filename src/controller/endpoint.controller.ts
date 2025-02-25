import { Controller, Post, Body, Get, Headers, Query, Param, Put, Res, Delete } from '@nestjs/common';
import { ICreateCategory, ICreateEndpoint, IGetEndpoint, IQuerys, IUpdateCategory, IUpdateEndpoint, IUserProfile } from 'src/interface';
import { CategoryService } from 'src/service';
import { CommonComponents } from 'src/service/common.components';
import { Response } from 'express';
import { EndpointService } from 'src/service/endpoint/endpoint.service';

@Controller('endpoint')
export class EndpointController {
  constructor(private endpointService: EndpointService) {}

  @Get('/')
  async endpoints(@Query() args: IQuerys, @Headers('authorization') authToken: string, @Res() res: Response): Promise<Response> {
    try { 
        await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin", "consumer"]})
        const result = await this.endpointService.getEndpoints(args);
        return CommonComponents.throwResponse(result, "Query endpoints success", res)
    } catch (error) {
        return CommonComponents.throwErrorResponse(error, res)
    }
  }
  @Get('/table')
  async getPageEndpoints(@Query() args: IQuerys, @Headers('authorization') authToken: string, @Res() res: Response): Promise<Response> {
    try { 
        await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin", "consumer"]})
        const result = await this.endpointService.getPageEndpoints(args);
        return CommonComponents.throwResponse(result, "Query page endpoints success", res)
    } catch (error) {
        return CommonComponents.throwErrorResponse(error, res)
    }
  }
  @Get('/:id')
    async endpoint(@Param('id') id: string, @Headers('authorization') authToken: string, @Res() res: Response): Promise<Response> {
    try { 
        await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin", "consumer"]})
        const result = await this.endpointService.getEndpoint({id});
        return CommonComponents.throwResponse(result, "Query endpoint success", res)
    } catch (error) {
        return CommonComponents.throwErrorResponse(error, res)
    }
  }
  @Post('/')
  async createEndpoint(@Body() args: ICreateEndpoint, @Headers('authorization') authToken: string, @Res() res: Response): Promise<Response> {
    try { 
        const user: IUserProfile | any = await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin"]})
        const result = await this.endpointService.createEndpoint(args, user);
        return CommonComponents.throwResponse(result, "Create category success", res)
    } catch (error) {
        return CommonComponents.throwErrorResponse(error, res)
    }
  }
  @Put('/:id')
  async updateEndpoint(@Param('id') id: string, @Body() args: IUpdateEndpoint, @Headers('authorization') authToken: string, @Res() res: Response): Promise<Response> {
    try { 
        const user: IUserProfile | any = await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin"]})
        const result = await this.endpointService.updateEndpoint({...args, id: id}, user);
        return CommonComponents.throwResponse(result, "Update endpoint success", res)
    } catch (error) {
        return CommonComponents.throwErrorResponse(error, res)
    }
  }
  @Delete('/:id')
  async deleteEndpoint(@Param('id') id: string, @Headers('authorization') authToken: string, @Res() res: Response): Promise<Response> {
    try { 
        await CommonComponents.verifyJWT({token: authToken, roles: ["superadmin", "admin"]})
        const result = await this.endpointService.deleteEndpoint({id});
        return CommonComponents.throwResponse(result, "Delete endpoint success", res)
    } catch (error) {
        return CommonComponents.throwErrorResponse(error, res)
    }
  }
}
