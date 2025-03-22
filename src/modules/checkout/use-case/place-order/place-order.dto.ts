export interface PlaceOrderInputDto {
    clientId: string;
    products: {
        productId: string;
    }[];
}

export interface PlaceOrderOutputDto {
    Id: string;
    invoiceId: string;
    status: string;
    total:number;
    products: {
        productId: string;
    }[];
}
