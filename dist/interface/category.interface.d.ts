export interface ICategory {
    id: string;
    categoriesName: string;
    createdOn: Date;
    updatedOn: Date;
    createdBy: string;
    updatedBy: string;
}
export interface IGetCategory {
    id?: string | any;
    categoriesName?: string;
}
export interface ICreateCategory {
    categoriesName: string;
}
export interface IUpdateCategory {
    id: string;
    categoriesName: string;
}
