import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/entity/invoice-itens.entity";
import Invoice from "../../domain/entity/invoice.entity";
import Address from "../../domain/value-object/address.value-object";
import InvoiceGateway from "../../gateway/invoice.gateway";
import AddressModel from "../address/address.model";
import InvoiceModel from "./Invoice.model";
import ItemsModel from "../Items/items.model";

export default class InvoiceRepository implements InvoiceGateway{
    async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findByPk(id, {
            include: [AddressModel, ItemsModel]
        });

        return new Invoice({
            id: new Id(invoice.id),
            name: invoice.name,
            document: invoice.document,
            address: new Address({
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
            }),
            items: invoice.items.map((item) => new InvoiceItems({
                id: new Id(item.id),
                name: item.name,
                price: item.price,
            }))
        });
    }
    
    async generate(invoice: Invoice): Promise<Invoice> {
        const newInvoice = await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
        });

        await invoice.items.map(async (item) => {
                await ItemsModel.create({
                    id: item.id.id,
                    name: item.name,
                    price: item.price,
                    invoiceId: newInvoice.id,
                })
        });

         await AddressModel.create({
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            invoiceId: newInvoice.id,
        });

        await newInvoice.reload({
            include: [AddressModel, ItemsModel]
        });
       
        return new Invoice({
            id: new Id(newInvoice.id),
            name: invoice.name,
            document: invoice.document,
            address: new Address({
            street: newInvoice.address.street,
            number: newInvoice.address.number,
            complement: newInvoice.address.complement,
            city: newInvoice.address.city,
            state: newInvoice.address.state,
            zipCode: newInvoice.address.zipCode,
            }),
            items: newInvoice.items.map((item) => new InvoiceItems({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
            })),
            createdAt: newInvoice.createdAt,
            updatedAt: newInvoice.updatedAt,
        });
    }
}