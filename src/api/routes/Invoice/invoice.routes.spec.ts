
import OrderClientAddressModel from "../../../modules/customer-adm/repository/address/address.model";
import ClientModel from "../../../modules/customer-adm/repository/customer.model";
import { ProductModel  as ProductCatalogModel} from "../../../modules/store-catolog/repository/product.model";
import { ProductModel } from "../../../modules/product-adm/reposotory/product.model";
import { app, sequelize} from "./../../express";
import  request  from "supertest";
import ItemsModel from "../../../modules/invoice/repository/Items/items.model";
import InvoiceModel from "../../../modules/invoice/repository/invoice/Invoice.model";
import InvoiceAddressModel from "../../../modules/invoice/repository/address/address.model";

describe('E2E test from checkout',() => {

    beforeEach(async () =>{
        await sequelize.sync({ force: true});
    });

    afterAll(async () =>{
        await sequelize.sync();
        await sequelize.close();
    })

    it('should add a new checkout', async () => {
        await InvoiceModel.sync(); 
        await ItemsModel.sync();
        await InvoiceAddressModel.sync();

        const invoice = await InvoiceModel.create({
            id: '1I',
            name: 'Invoice 1',
            document: '00000000000'
        })
 
        await InvoiceAddressModel.create({
            street: 'Street 1',
            number: '123',
            complement: 'Complement 1',
            city: 'City 1',
            state: 'State 1',
            country: 'Country 1',
            zipCode: '00000',
            invoiceId: invoice.id
        });


        await ItemsModel.create({
            id: '1p',
            name: "Product teste",
            description: "Description test",
            salesPrice: 20,
            invoiceId: invoice.id
        });
        

       await ItemsModel.create({
            id:'2p',
            name: "Product teste",
            description: "Description test",
            salesPrice: 20,
            invoiceId: invoice.id
        });
    

        const response = await request(app)
            .get('/invoice')
            .send({
                id: '1I',
            });

            expect(response.status).toBe(200);
            expect(response.body.total).toBe(40);
       
    })
})