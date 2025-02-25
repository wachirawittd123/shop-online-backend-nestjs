import { IUser } from "./user.interface";


export interface IPricing {
    id: string;
    icPerPrice: number;
    validatePeriod: number;
    min: number;
    max: number;
    createdOn: Date;
    updatedOn: Date;
    createdBy?: string;
    updatedBy?: string;
    createdByUser?: IUser;
    updatedByUser?: IUser;
}

export interface IGetPricing {
    id?: string | any;
    icPerPrice?: number;
    validatePeriod?: number;
    min?: number;
    max?: number;
}

export interface ICreatePricing {
    icPerPrice: number;
    validatePeriod: number;
    min: number;
    max: number;
}

export interface IUpdatePricing extends ICreatePricing {
    id: string;
}