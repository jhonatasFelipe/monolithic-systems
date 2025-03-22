
import ClientModel from "../../../modules/customer-adm/repository/customer.model";
import { ProductModel  as ProductCatalogModel} from "../../../modules/store-catolog/repository/product.model";
import { ProductModel } from "../../../modules/product-adm/reposotory/product.model";
import { app, sequelize} from "./../../express";
import  request  from "supertest";
import OrderClientAddressModel from "../../../modules/checkout/repository/address/address.model";
import AddressModel from "../../../modules/customer-adm/repository/address/address.model";


describe('E2E test from checkout',() => {

    beforeEach(async () =>{
        await sequelize.sync({ force: true});
    });

    afterAll(async () =>{
        await sequelize.sync();
        await sequelize.close();
    })

    it('should add a new checkout', async () => {
        await ProductModel.sync(); 
        await ProductCatalogModel.sync();
        await AddressModel.sync();
        await OrderClientAddressModel.sync();

        const client = await ClientModel.create({
            id: '1c',
            name: 'John Doe',
            email: 'johndoe@teste.com',
            document: '12345',
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
      
        await AddressModel.create({
            street: 'Street 1',
            number: '123',
            complement: 'Complement 1',
            city: 'City 1',
            state: 'State 1',
            country: 'Country 1',
            zipCode: '00000',
            customerId: client.id
        });
        
        const productAdm1 = await ProductModel.create({
            id: '1p',
            name: "Product teste",
            description: "Description test",
            purchasePrice: 100,
            stock: 100,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        

        const productAdm2 = await ProductModel.create({
            id:'2p',
            name: "Product teste",
            description: "Description test",
            purchasePrice: 100,
            stock: 100,
            createdAt: new Date(),
            updatedAt: new Date()
        });


        await ProductCatalogModel.create({
            id: '1p',
            name: "Product teste",
            description: "Description test",
            salesPrice: 100,
        });
        

        await ProductCatalogModel.create({
            id:'2p',
            name: "Product teste",
            description: "Description test",
            salesPrice: 100,
        });
    

        const response = await request(app)
            .post('/checkout')
            .send({
                clientId: client.id,
                products:[                                                                                                                                                   
                    { productId:productAdm1.id }, 
                    { productId:productAdm2.id }
                ]
            });

            expect(response.status).toBe(200);
            expect(response.body.total).toBe(200);
            expect(response.body.status).toBe('Pending');
       
    })
})