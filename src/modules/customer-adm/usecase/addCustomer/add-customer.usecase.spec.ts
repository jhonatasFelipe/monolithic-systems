import AddCustomerUseCase from "./add-customer.usecase";


const mockRepository = ()=>{
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}
describe("Add Customer useCase unit test",()=>{
    it("should add a customer",async ()=>{
        
        const customerRepository = mockRepository();
        const usecase = new AddCustomerUseCase(customerRepository);
        const input = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            address: 'address 1'
        }

        const result = await usecase.execute(input);
        expect(customerRepository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.email).toBe(input.email);
        expect(result.address).toBe(input.address);
    });
})