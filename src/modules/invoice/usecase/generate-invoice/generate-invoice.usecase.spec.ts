import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/entity/invoice-itens.entity";
import Invoice from "../../domain/entity/invoice.entity";
import Address from "../../domain/value-object/address.value-object";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

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


const mockRepository = () =>{
    return {
        find: jest.fn(),
        generate: jest.fn().mockResolvedValue(invoice),
    }
}



describe("Generate Invoice use Case united test" ,()=>{

    it("should generate an invoice", async ()=>{

        const repository = mockRepository();

        const useCase = new GenerateInvoiceUseCase(repository);

        const input  = {
            name: 'Cliente Teste',
            document: '1234567890',
            street: 'Rua 1',
            number: '100',
            complement: 'Casa 1',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '12345678',
            items: [
                {
                    id: '1',
                    name: 'Notebook',
                    salesPrice: 1000
                },
                {
                    id: '2',
                    name: 'Iphone',
                    salesPrice: 5000
                }
            ]
        }
        const result = await useCase.execute(input);

        expect(repository.generate).toHaveBeenCalled();
        expect(result.id).toBe(invoice.id.id);
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.street).toBe(input.street);
        expect(result.number).toBe(input.number);
        expect(result.complement).toBe(input.complement);
        expect(result.city).toBe(input.city);
        expect(result.state).toBe(input.state);
        expect(result.zipCode).toBe(input.zipCode);
        expect(result.items.length).toBe(2);
        expect(result.items[0].id).toBe(item1.id.id);
        expect(result.items[0].name).toBe(item1.name);
        expect(result.items[0].salesPrice).toBe(item1.salesPrice);
        expect(result.items[1].id).toBe(item2.id.id);
        expect(result.items[1].name).toBe(item2.name);
        expect(result.items[1].salesPrice).toBe(item2.salesPrice);
        expect(result.total).toBe(6000);

    });
})