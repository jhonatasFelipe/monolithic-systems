export interface AddCustomerInputDto {
    id?: string
    name: string;
    email: string;
    document: string,
    address : {
        street: string,
        number: string,
        city: string,
        state: string,
        zipCode: string,
        complement: string
    }
}


export interface AddCustomerOutputDto {
    id: string;
    name: string;
    email: string;
    document: string,
    address : {
        street: string,
        number: string,
        city: string,
        state: string,
        zipCode: string,
        complement: string
    }
    createdAt: Date;
    updatedAt: Date;
}