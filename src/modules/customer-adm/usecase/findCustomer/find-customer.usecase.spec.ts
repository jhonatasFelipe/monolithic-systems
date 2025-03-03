import Id from "../../../@shared/domain/value-object/id.value-object";
import Customer from "../../domain/customer.entity";
import FindCustomerUseCase from "./find-customer.usecase";

const customer = new Customer({
    id: new Id('123'),
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St'
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
        expect(result.address).toBe(customer.address);
        expect(result.createdAt).toBe(customer.createdAt);
        expect(result.updatedAt).toBe(customer.updatedAt);
    });
})


