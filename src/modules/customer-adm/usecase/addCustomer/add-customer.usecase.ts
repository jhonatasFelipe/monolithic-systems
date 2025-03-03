import Id from "../../../@shared/domain/value-object/id.value-object";
import Customer from "../../domain/customer.entity";
import CustomerGateway from "../../gateway/client.gateway";
import { AddCustomerInputDto, AddCustomerOutputDto } from "./add-customer.usecase.dto";

export default class AddCustomerUseCase {

    private _customerRepository: CustomerGateway;

    constructor(customerRepository: CustomerGateway) {
        this._customerRepository = customerRepository;
    }

    async execute(input: AddCustomerInputDto): Promise<AddCustomerOutputDto> {

        const customer = new Customer(
            {
                id: new Id(input.id) || new Id(),
                name: input.name,
                email: input.email,
                address: input.address
            }
        )
        
        this._customerRepository.add(customer);
        return {
            id: customer.id.id,
            name: customer.name,
            email: customer.email,
            address: customer.address,
            createdAt: customer.createdAt,
            updatedAt: customer.updatedAt,
         };
    }

}