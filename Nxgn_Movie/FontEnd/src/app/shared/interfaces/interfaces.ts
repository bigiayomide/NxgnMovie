
export interface IAuthDetails {
    token: string;
    username: string;
    roles: string[];
}

export interface IResultVM {
    status: StatusEnum;
    message: string;
    token: string;
    roles: string[];
    username: string;
    data: {};
}

export enum StatusEnum {
    Success = 1,
    Error = 2
}

export interface ILoginVM {
    userName: string;
    password: string;
}

//tr_usr_user
export interface IUser {
    id: number;
    usr_user_name: string;//email
    usr_code: number;
    usr_surname: string;
    usr_first_name: string;
    usr_password: string;
    usr_confirmpassword: string;
    usr_active: boolean;
    date_created: Date;
    date_updated: Date;
}

export interface IRegisterVM {
    id: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    isAdmin: Boolean;
}

export interface LoginResponseVM {
    userVM: UserVM,
    token: string
}

export interface ICategory {
    id?: number;
    title: string;
}

export interface IDialogMessage{
    message?:string;
    data?:any;
    valid:boolean;
}

export interface IEvent {
    id: number;
    category_id: number;
    event_name: string;
    event_number: number;
    event_date_time: Date;
    event_end_date_time: Date;
    auto_close: boolean;
    category?:ICategory;    
}

export interface IMovie{
    id?:number;
    description:string
    title:string
    category_id:number,
    rating:number,
    category?:ICategory
}

export interface UserVM {
    usr_code: number;
    usr_user_name: string;
    usr_first_name: string;
    usr_surname: string;
    usr_active: boolean;
}

export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T> {
    items: T;
    pagination: Pagination;
}

export interface Predicate<T> {
    // (item: T): boolean
    Predicate<T>(item: T): boolean;
}

