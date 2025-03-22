export interface AddCustomerFacadeInputDto {
    id?: string,
    name: string,
    email: string,
    document: string,
    address: {
        street: string;
        number: string;
        complement: string;
        city: string;
        state: string;
        zipCode: string;
    }
}

export interface FindCustomerFacadeInputDto {
    id: string;
}

export interface FindCustomerFacadeOutputDto {
    id: string;
    name: string;
    email: string;
    document: string,
    address: {
        street: string;
        number: string;
        complement: string;
        city: string;
        state: string;
        zipCode: string;
    }
    createdAt: Date;
    updatedAt: Date;
}

export default interface CustomerAdmFacadeInterface{
    add(input: AddCustomerFacadeInputDto): Promise<void>;
    find(input: FindCustomerFacadeInputDto): Promise<FindCustomerFacadeOutputDto>;
}