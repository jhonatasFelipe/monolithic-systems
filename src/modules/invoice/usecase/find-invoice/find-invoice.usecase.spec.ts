import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/entity/invoice-itens.entity";
import Invoice from "../../domain/entity/invoice.entity";
import Address from "../../domain/value-object/address.value-object";
import FindInvoiceUseCase from "./find-invoice.usecase";

const item1 = new InvoiceItems({
    id: new Id("1"),
    name: "Notebook",
    salesPrice: 1000,
});

const item2 = new InvoiceItems({
    id: new Id("2"),
    name: "Iphone",
    salesPrice: 5000,
})

const address = new Address({
    street: "Rua 1",
    number: "100",
    complement: "Casa 1",
    city: "São Paulo",
    state: "SP",
    zipCode: "12345678",
})

const invoice = new Invoice({
    id: new Id("1"),
    name: "Cliente Teste",
    document: "1234567890",
    address,
    items: [item1, item2],
    createdAt: new Date(),
    updatedAt: new Date(),
})


const mockRepository = () => {
    return {
        find: jest.fn().mockResolvedValue(invoice),
        generate: jest.fn(), 
    };
};

describe("Find invoice use case united test",()=>{
    it("should find an invoice", async () => {
        
        const repository = mockRepository();
        const useCase = new FindInvoiceUseCase(repository);

        const input = {
            id: "1" 
        }
        const result = await useCase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toBe(invoice.id.id);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);
        expect(result.items.length).toBe(2);
        expect(result.items[0].id).toBe(item1.id.id);
        expect(result.items[0].name).toBe(item1.name);
        expect(result.items[0].salesPrice).toBe(item1.salesPrice);
        expect(result.items[1].id).toBe(item2.id.id);
        expect(result.items[1].name).toBe(item2.name);
        expect(result.items[1].salesPrice).toBe(item2.salesPrice);
        expect(result.createdAt).toBeInstanceOf(Date); 
    })
})