import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import CustomerGateway from "../../gateway/client.gateway";
import FindCustomerInputDto, { FindCustomerOutputDto } from "./find-use.usecase.dto";

export default class FindCustomerUseCase implements UseCaseInterface{

    private _customerRepository: CustomerGateway;

    constructor(customerRepository: CustomerGateway){
        this._customerRepository = customerRepository;
    }

    async execute(input: FindCustomerInputDto): Promise<FindCustomerOutputDto> {
        const customer = await this._customerRepository.find(input.id);

        return {
            id: customer.id.id,
            name: customer.name,
            email: customer.email,
            document: customer.document,
            address: {
                street: customer.address.street,
                number: customer.address.number,
                complement: customer.address.complement,
                city: customer.address.city,
                state: customer.address.state,
                zipCode: customer.address.zipCode
            },
            createdAt: customer.createdAt,
            updatedAt: customer.updatedAt
        };
    }
}