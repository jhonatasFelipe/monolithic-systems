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
            address: customer.address,
            createdAt: customer.createdAt,
            updatedAt: customer.updatedAt
        };
    }
}