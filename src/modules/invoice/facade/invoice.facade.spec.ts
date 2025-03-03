

import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice/Invoice.model";
import AddressModel from "../repository/address/address.model";
import ItemsModel from "../repository/Items/items.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";


describe('InvoiceFacade test',  () => { 

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
            id: '1',
            name: 'Invoice 1',
            document: 'invoice1',
            address: {
                street: 'street 1',
                number: '1',
                complement: 'complement',
                city: 'city',
                state: 'state',
                zipCode: 'zipCode',
            },
            items: [
                {
                    id: '1',
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
                price: item.price,
            })
        })

        const facade = InvoiceFacadeFactory.create();
        
        const inputFind = {
            id: input.id
        }
        const result = await facade.find(inputFind);

        expect(result.name).toBe('Invoice 1');
        expect(result.document).toBe('invoice1');
        expect(result.address.street).toBe('street 1');
        expect(result.address.number).toBe('1');
        expect(result.address.complement).toBe('complement');
        expect(result.address.city).toBe('city');
        expect(result.address.state).toBe('state');
        expect(result.address.zipCode).toBe('zipCode');
        expect(result.items.length).toBe(2);
        expect(result.items[0].id).toBe('1');
        expect(result.items[0].name).toBe('Item 1');
        expect(result.items[0].price).toBe(100);
        expect(result.items[1].id).toBe('2');
        expect(result.items[1].name).toBe('Item 2');
        expect(result.items[1].price).toBe(200);

    })


    it('should find an invoice', async () => {

        const input  = {
            id: '1',
            name: 'Invoice 1',
            document: 'invoice1',
            street: 'street 1',
            number: '1',
            complement: 'complement',
            city: 'city',
            state: 'state',
            zipCode: 'zipCode',
            items: [
                {
                    id: '1',
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
        
        const facade = InvoiceFacadeFactory.create();

        const result = await facade.generate(input);

        expect(result.name).toBe('Invoice 1');
        expect(result.document).toBe('invoice1');
        expect(result.street).toBe('street 1');
        expect(result.number).toBe('1');
        expect(result.complement).toBe('complement');
        expect(result.city).toBe('city');
        expect(result.state).toBe('state');
        expect(result.zipCode).toBe('zipCode');
        expect(result.items.length).toBe(2);
        expect(result.items[0].id).toBe('1');
        expect(result.items[0].name).toBe('Item 1');
        expect(result.items[0].price).toBe(100);
        expect(result.items[1].id).toBe('2');
        expect(result.items[1].name).toBe('Item 2');
        expect(result.items[1].price).toBe(200);

    });
})