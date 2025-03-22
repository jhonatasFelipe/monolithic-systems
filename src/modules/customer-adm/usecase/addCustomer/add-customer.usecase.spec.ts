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
            document: '00000',
            address : {
                street: 'Street 1',
                number: '123',
                complement: "complemento 1",
                city: 'City 1',
                state: 'State 1',
                zipCode: '00000'
            }
        }

        const result = await usecase.execute(input);
        expect(customerRepository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.email).toBe(input.email);
        expect(result.document).toBe(input.document);
        expect(result.address.street).toBe(input.address.street);
        expect(result.address.number).toBe(input.address.number);
        expect(result.address.city).toBe(input.address.city);
        expect(result.address.state).toBe(input.address.state);
        expect(result.address.zipCode).toBe(input.address.zipCode);
    });
})