

import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./Invoice.model";
import AddressModel from "../address/address.model";
import ItemsModel from "../Items/items.model";
import InvoiceRepository from "./invoice.repository";
import Invoice from "../../domain/entity/invoice.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../domain/value-object/address.value-object";
import InvoiceItems from "../../domain/entity/invoice-itens.entity";


describe('InvoiceRepository test',  () => { 

    let sequelize: Sequelize;

    beforeEach(async ()=>{
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([InvoiceModel,AddressModel,ItemsModel]);
        await sequelize.sync();
    });

    afterEach(async ()=>{
        await sequelize.close();
    })

    it('should create an invoice', async () => {

        const input  = {
            id: new Id('1'),
            name: 'Invoice 1',
            document: 'invoice1',
            address: new Address({
                street: 'street 1',
                number: '1',
                complement: 'complement',
                city: 'city',
                state: 'state',
                zipCode: 'zipCode',
            }),
            items: [
                new InvoiceItems({
                    id: new Id('1'),
                    name: 'Item 1',
                    salesPrice: 100,
                }),
                new InvoiceItems({
                    id: new Id('2'),
                    name: 'Item 2',
                    salesPrice: 200,
                }),
            ]
        }

        const invoice = new Invoice(input);
        const invoiceRepository = new InvoiceRepository();
        const result = await invoiceRepository.generate(invoice);

        expect(result.id.id).toBe('1');
        expect(result.name).toBe('Invoice 1');
        expect(result.document).toBe('invoice1');
        expect(result.address.street).toBe('street 1');
        expect(result.address.number).toBe('1');
        expect(result.address.complement).toBe('complement');
        expect(result.address.city).toBe('city');
        expect(result.address.state).toBe('state');
        expect(result.address.zipCode).toBe('zipCode');
        expect(result.items.length).toBe(2);
        expect(result.items[0].id.id).toBe('1');
        expect(result.items[0].name).toBe('Item 1');
        expect(result.items[0].salesPrice).toBe(100);
        expect(result.items[1].id.id).toBe('2');
        expect(result.items[1].name).toBe('Item 2');
        expect(result.items[1].salesPrice).toBe(200);

    })


    it('should find an invoice', async () => {

        const input  = {
            id: '1',
            name: 'Invoice 1',
            document: 'invoice1',
            address:{
                street: 'street 1',
                number: '1',
                complement: 'complement',
                city: 'city',
                state: 'state',
                zipCode: 'zipCode',
            },
            items: [
                {
                    id: 1,
                    name: 'Item 1',
                    price: 100,
                },
                {
                    id: '2',
                    name: 'Item 2',
                    price: 200,
                },
            ]
        }

        await InvoiceModel.create({
            id: input.id,
            name: input.name,
            document: input.document,
        });

        await AddressModel.create({

            invoiceId: input.id,
            ...input.address
        });

        await input.items.forEach(async (item)=>{
            await ItemsModel.create({
                id: item.id,
                invoiceId: input.id,
                name: item.name,
                salesPrice: item.price,
            })
        })

        const invoiceRepository = new InvoiceRepository();
        const result = await invoiceRepository.find(input.id);

        expect(result.id.id).toBe('1'); 
        expect(result.name).toBe('Invoice 1');
        expect(result.document).toBe('invoice1');
        expect(result.address.street).toBe('street 1');
        expect(result.address.number).toBe('1');
        expect(result.address.complement).toBe('complement');
        expect(result.address.city).toBe('city');
        expect(result.address.state).toBe('state');
        expect(result.address.zipCode).toBe('zipCode');
        expect(result.items.length).toBe(2);
        expect(result.items[0].id.id).toBe('1');
        expect(result.items[0].name).toBe('Item 1');
        expect(result.items[0].salesPrice).toBe(100);
        expect(result.items[1].id.id).toBe('2');
        expect(result.items[1].name).toBe('Item 2');
        expect(result.items[1].salesPrice).toBe(200);

    });
})