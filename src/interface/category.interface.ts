import { IService } from "./service.interface";

export interface ICategory {
  id: string;
  categoriesName: string;
  createdOn: Date;
  updatedOn: Date;
  createdBy: string;
  updatedBy: string;
  services: IService[];
}

export interface IGetCategory {
  id?: string | any;
  categoriesName?: string;
}

export interface IGetPageCategories {
  total: number;
  results: ICategory[];
}

export interface ICreateCategory {
  categoriesName: string;
}

export interface IUpdateCategory {
  id: string;
  categoriesName: string;
}
