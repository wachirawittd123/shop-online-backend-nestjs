import { IService } from "./service.interface";

export interface IEndpoint {
    id: string;
    apiServiceId?: string;
    name: string;
    description?: string;
    requestUrl: string;
    isActive?: boolean;
    requestMethod?: string;
    creditPerRequest?: number;
    createdOn?: Date;
    updatedOn?: Date;
    createdBy?: string;
    updatedBy?: string;
    order?: number;
    productName?: string;
    service?: IService; // Assuming Service is another interface or type defined elsewhere
}

export interface IGetEndpoint {
    id?: string | any;
    name?: string;
    description?: string;
    requestUrl?: string;
    apiServiceId?: string;
}

export interface IGetPageEndpoints {
    total: number;
    results: IEndpoint[];
}

export interface ICreateEndpoint {
    apiServiceId: string
    name: string
    description: string
    requestUrl: string
    requestMethod: string
    creditPerRequest: number;
    order?: number
}

export interface IUpdateEndpoint extends ICreateEndpoint {
    id: string
}