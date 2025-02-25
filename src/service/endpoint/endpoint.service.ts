
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { ICreateEndpoint, IEndpoint, IGetEndpoint, IGetPageEndpoints, IQuerys, IUpdateEndpoint, IUserProfile } from 'src/interface';
import { EndpointComponents } from './endpoint.components';
import { CustomError } from '../common.components';
import { ServiceComponents } from '../service/service.components';

@Injectable()
export class EndpointService {
  constructor(private readonly prisma: PrismaService) {}

  async getEndpoints(args: IQuerys): Promise<IEndpoint[] | any> {
    const where = EndpointComponents.genEndpointQuery(args);
    return await this.prisma.endpoint.findMany({where, include: {service: true}});
  }
  async getEndpoint(args: IGetEndpoint): Promise<IEndpoint | any> {
    return await EndpointComponents.findEndpoint(this.prisma, args);
  }
  async getPageEndpoints(args: IQuerys): Promise<IGetPageEndpoints | any> {
    const where = EndpointComponents.genEndpointQuery(args);
    const total = await this.prisma.endpoint.count({ where });
    const results = await this.prisma.endpoint.findMany({
      where,
      include: {service: true},
      orderBy: { order: 'asc' },
      skip: Number(args.skip) || 0,
      take: Number(args.limit) || 20,
    });
  
    return {
      total,
      results,
    };
 }
 async createEndpoint(args: ICreateEndpoint, user: IUserProfile): Promise<IEndpoint | any> {
    let newArgs: any = {...args}
    if(!args.apiServiceId) throw new CustomError("Api service id is required", 400);
    const service = await ServiceComponents.findService(this.prisma, {id: args.apiServiceId});
    if(!service) throw new CustomError("Api service not found", 400);
    newArgs.service = {connect: {id: args.apiServiceId}}
    delete newArgs.apiServiceId
    return await this.prisma.endpoint.create({data: {...newArgs, createdBy: user.id, updatedBy: user.id }});
 }
 async updateEndpoint(args: IUpdateEndpoint, user: IUserProfile): Promise<IEndpoint | any> {
    let newArgs: any = {...args}
    if(!args.id) throw new CustomError("Endpoint id is required", 400);
    const endpoint = await EndpointComponents.findEndpoint(this.prisma, {id: args.id});
    if(!endpoint) throw new CustomError("Endpoint not found", 400);
    newArgs.service = {connect: {id: args.apiServiceId}}
    delete newArgs.apiServiceId
    return await this.prisma.endpoint.update({where: {id: args.id}, data: {...newArgs, updatedBy: user.id}});
 }
 async deleteEndpoint(args: IGetEndpoint): Promise<IEndpoint | any> {
    if(!args.id) throw new CustomError("Endpoint id is required", 400);
    const endpoint = await EndpointComponents.findEndpoint(this.prisma, {id: args.id});
    if(!endpoint) throw new CustomError("Endpoint not found", 400);
    return await this.prisma.endpoint.delete({where: {id: args.id}});
 }

}
