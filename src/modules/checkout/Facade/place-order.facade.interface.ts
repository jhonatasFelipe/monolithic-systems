
export interface PlaceOrderFacadeInputDto{
    clientId: string;
    products: {
        productId: string;
    }[];
}


export interface PlaceOrderFacadeOutputDto {
    Id: string;
    invoiceId: string;
    status: string;
    total:number;
    products: {
        productId: string;
    }[];
}


export default interface PlaceOrderFacadeInterface {
    placeOrder(input: PlaceOrderFacadeInputDto): Promise<PlaceOrderFacadeOutputDto>;
}