
export interface FindInvoiceFacadeInputDTO {
    id: string;
}
  
export interface FindInvoiceFacadeOutputDTO {
    id: string;
    name: string;
    document: string;
    address: {
        street: string;
        number: string;
        complement: string;
        city: string;
        state: string;
        zipCode: string;
    };
    items: {
        id: string;
        name: string;
        salesPrice: number;
    }[];
    total: number;
    createdAt: Date;
}


export interface GenerateInvoiceFacadeInputDto {
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: {
      id: string;
      name: string;
      salesPrice: number;
    }[];
  }
  
  export interface GenerateInvoiceFacadeOutputDto {
    id: string;
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: {
      id: string;
      name: string;
      salesPrice: number;
    }[];
    total: number;
  }

export default interface InvoiceFacadeInterface {
    find(id: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO>;
    generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto>;
}