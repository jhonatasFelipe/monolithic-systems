export default interface FindCustomerInputDto{
    id: string;
} 


export interface FindCustomerOutputDto {
    id: string;
    name: string;
    email: string;
    document: string,
    address: {
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