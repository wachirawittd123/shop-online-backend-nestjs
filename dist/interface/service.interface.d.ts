import { ICategory } from "./category.interface";
export interface IService {
    id: string;
    name: string;
    category?: ICategory;
    apiCategoriesId: string;
    price?: number;
    description?: string;
    description_EN?: string;
    order?: number;
    urlPath?: string;
    useCaseDetail1?: string;
    useCaseDetail1_EN?: string;
    useCaseDetail2?: string;
    useCaseDetail2_EN?: string;
    useCaseDetail3?: string;
    useCaseDetail3_EN?: string;
    useCaseImagePath?: string;
    imagePath?: string;
    createdOn?: Date;
    updatedOn?: Date;
    createdBy?: string;
    updatedBy?: string;
    docsUrl?: string;
    isFeaturedProducts?: boolean;
    icon?: string;
}
export interface IGetService {
    id?: string | any;
    apiCategoriesId?: string;
    name?: string;
    description?: string;
    description_EN?: string;
    urlPath?: string;
    useCaseDetail1?: string;
    useCaseDetail1_EN?: string;
    useCaseDetail2?: string;
    useCaseDetail2_EN?: string;
    useCaseDetail3?: string;
    useCaseDetail3_EN?: string;
}
export interface ICreateService {
    name: string;
    description: string;
    apiCategoriesId: string;
    price: number;
    createdBy?: string;
    updatedBy?: string;
}
export interface IUpdateService extends ICreateService {
    id: string;
}
