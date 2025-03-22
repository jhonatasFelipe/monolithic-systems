import Id from "../../../@shared/domain/value-object/id.value-object";
import Customer from "../../domain/entity/customer.entity";
import Address from "../../domain/value-object/address.value-object";
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
                document: input.document,
                address : new Address({
                    street: input.address.street,
                    complement: input.address.complement,
                    number: input.address.number,
                    city: input.address.city,
                    state: input.address.state,
                    zipCode: input.address.zipCode,
                }),
            }
        )
        
        this._customerRepository.add(customer);
        return {
            id: customer.id.id,
            name: customer.name,
            email: customer.email,
            document: customer.document,
            address: {
                street: customer.address.street,
                number: customer.address.number,
                city: customer.address.city,
                state: customer.address.state,
                zipCode: customer.address.zipCode,
                complement: customer.address.complement
            },
            createdAt: customer.createdAt,
            updatedAt: customer.updatedAt,
         };
    }

}