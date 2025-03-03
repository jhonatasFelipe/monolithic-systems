export default interface FindCustomerInputDto{
    id: string;
} 


export interface FindCustomerOutputDto {
    id: string;
    name: string;
    email: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}