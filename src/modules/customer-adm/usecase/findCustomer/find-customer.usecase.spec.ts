import Id from "../../../@shared/domain/value-object/id.value-object";
import Customer from "../../domain/entity/customer.entity";
import Address from "../../domain/value-object/address.value-object";
import FindCustomerUseCase from "./find-customer.usecase";

const customer = new Customer({
    id: new Id('123'),
    name: 'John Doe',
    email: 'john.doe@example.com',
    document: '12345678901',
    address : new Address({
        street: 'Street 1',
        number: '123',
        complement: "complemento 1",
        city: 'City 1',
        state: 'State 1',
        zipCode: '00000',
    })
});

const mockRepository = ()=>{
    return {
        add: jest.fn(),
        find: jest.fn().mockResolvedValue(customer)
    }
}

describe("Find Customer useCase unit test",()=>{
    it("should find a customer",async ()=>{
        
        const customerRepository = mockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);
        const input = {
           id: '123'
        }

        const result = await usecase.execute(input);
        expect(customerRepository.find).toHaveBeenCalled();
        expect(result.id).toBe(customer.id.id);
        expect(result.name).toBe(customer.name);
        expect(result.email).toBe(customer.email);
        expect(result.document).toBe(customer.document);
        expect(result.address.street).toBe(customer.address.street);
        expect(result.address.number).toBe(customer.address.number);
        expect(result.address.city).toBe(customer.address.city);
        expect(result.address.state).toBe(customer.address.state);
        expect(result.address.zipCode).toBe(customer.address.zipCode);
        expect(result.createdAt).toBe(customer.createdAt);
        expect(result.updatedAt).toBe(customer.updatedAt);
    });
})


