
export interface AddProductInputDTO {
    id?: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}

export interface AddProductOutputDTO {
    id: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
    created_at:Date;
    updated_at: Date;
}