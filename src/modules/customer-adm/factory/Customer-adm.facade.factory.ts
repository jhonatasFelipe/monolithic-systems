import CustomerAdmFacade from "../facade/customer-adm.facede";
import CustomerRepository from "../repository/Customer.repository";
import AddCustomerUseCase from "../usecase/addCustomer/add-customer.usecase";
import FindCustomerUseCase from "../usecase/findCustomer/find-customer.usecase";

export default class CustomerAdmFacadeFactory{
    static create(): CustomerAdmFacade {
        const clientRepository = new CustomerRepository();
        const addClientUseCase = new AddCustomerUseCase(clientRepository);
        const findClientUseCase = new FindCustomerUseCase(clientRepository);
        const customerFacade = new CustomerAdmFacade({
            addUseCase: addClientUseCase,
            findUseCase: findClientUseCase
        });

        return customerFacade;
    }
}
