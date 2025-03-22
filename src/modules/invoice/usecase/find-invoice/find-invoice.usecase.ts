import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import FindCustomerInputDto from "../../../customer-adm/usecase/findCustomer/find-use.usecase.dto";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.usecase.dto";

export default class FindInvoiceUseCase implements UseCaseInterface{
    constructor(
        private invoiceRepository: InvoiceGateway
    ){}

    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {

        const result = await this.invoiceRepository.find(input.id);

        return {
            id: result.id.id,
            name: result.name,
            document: result.document,
            address: {
                street: result.address.street,
                number: result.address.number,
                complement: result.address.complement,
                city: result.address.city,
                state: result.address.state,
                zipCode: result.address.zipCode,
            },
            items: result.items.map(item => ({
                id: item.id.id,
                name: item.name,
                salesPrice: item.salesPrice,
            })),
            total: result.items.reduce((total, item) => total + item.salesPrice, 0),
            createdAt: result.createdAt,
        }
    }
}