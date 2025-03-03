export interface AddCustomerFacadeInputDto {
    id?: string;
    name: string;
    email: string;
    address: string;
}

export interface FindCustomerFacadeInputDto {
    id: string;
}

export interface FindCustomerFacadeOutputDto {
    id: string;
    name: string;
    email: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}

export default interface CustomerAdmFacadeInterface{
    add(input: AddCustomerFacadeInputDto): Promise<void>;
    find(input: FindCustomerFacadeInputDto): Promise<FindCustomerFacadeOutputDto>;
}