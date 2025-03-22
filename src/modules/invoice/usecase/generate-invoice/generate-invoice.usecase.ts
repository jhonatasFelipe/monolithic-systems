import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import InvoiceItems from "../../domain/entity/invoice-itens.entity";
import Invoice from "../../domain/entity/invoice.entity";
import Address from "../../domain/value-object/address.value-object";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {

    constructor(
        private invoiceRepository: InvoiceGateway
    ) {}
    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {

        const address = new Address({
            street: input.street,
            number: input.number,
            complement: input.complement,
            city: input.city,
            state: input.state,
            zipCode: input.zipCode,
        })

        const items = input.items.map((item) => new InvoiceItems({
            id: new Id(item.id),
            name: item.name,
            salesPrice: item.salesPrice
        }));

        const newInvoice = new Invoice({
            name: input.name,
            document: input.document,
            address,
            items
        });

        const invoice = await this.invoiceRepository.generate(newInvoice);

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            complement: invoice.address.complement,
            items: invoice.items.map((item) => (
                {
                    id: item.id.id,
                    name: item.name,
                    salesPrice: item.salesPrice
                }
            )),
            total: invoice.items.reduce((accumulator, currentValue)=>{
                return accumulator + currentValue.salesPrice
            },0)
        }
    }
}