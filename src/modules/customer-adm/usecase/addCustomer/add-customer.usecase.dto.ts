export interface AddCustomerInputDto {
    id?: string
    name: string;
    email: string;
    address: string;
}


export interface AddCustomerOutputDto {
    id: string;
    name: string;
    email: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}