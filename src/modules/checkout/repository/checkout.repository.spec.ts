import { Sequelize } from "sequelize-typescript";
import OrderModel from "./order/order.model"
import AddressModel from "./address/address.model";
import ClientModel from "./client/order-client.model";
import Order from "../domain/order.entity";
import ProductModel from "./products/products.model";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../domain/value-object/address.value-object";
import Product from "../domain/product.entity";
import CheckoutRepository from "./checkout.repository";


describe('Checkout repository test' , () => {

    let sequelize: Sequelize;
    
        beforeEach(async ()=>{
            sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: ':memory:',
                logging: false,
                sync: { force: true },
            });
    
            await sequelize.addModels(
                [
                    ClientModel,
                    AddressModel,
                    OrderModel,
                    ProductModel
                ]);
            await sequelize.sync();
        });
    
        afterEach(async ()=>{
            await sequelize.close();
        })
    it('should add an order', async ()=>{
        
         const client = new Client({
            id: new Id('1'),
            name: 'Client 1',
            email: 'client1@example.com',
            address: new Address({
                street: 'Street 1',
                number: '123',
                complement: "complemento 1",
                city: 'City 1',
                state: 'State 1',
                zipCode:'00000-000',
            }),
         });
         
         
         const product1 = new Product({
            id: new Id('1'),
            name: 'Product 1',
            description: 'Product 1 Description',
            salesPrice: 10,
         });

         const product2 = new Product({
            id: new Id('2'),
            name: 'Product 2',
            description: 'Product 2 Description',
            salesPrice: 20,
         });

         const order = new Order({
            id: new Id('1'),
            client: client,
            products: [product1, product2],
            status: 'approved',
         })


         const checkoutRepository =  new CheckoutRepository();

         await checkoutRepository.addOrder(order);

         const orderDb = await  OrderModel.findOne({ 
            where: {id:order.id.id},
            include: [ ClientModel, ProductModel]
         });

         expect(orderDb).not.toBeNull();
         expect(orderDb.client.id).toBe(client.id.id);
         expect(orderDb.products[0].id).toBe(product1.id.id);
         expect(orderDb.products[1].id).toBe(product2.id.id);
         expect(orderDb.status).toBe('approved');
    }),


    it('should find an order', async ()=>{

        
        await ClientModel.create({
            id: '1c',
            name: 'client 1',
            email: 'client1@teste.com',
            orderId: '1o'
        })

        await AddressModel.create({
            street: 'street 1',
            number: 'number 1',
            complement: 'complement 1',
            city: 'city 1',
            state: 'state 1',
            zipCode: '12345',
            clientId: '1c'
        })

        await OrderModel.create({
            id: '1o',
            clientId: '1c',
            status: 'approved',
            total: 100,
        });

        
        await ProductModel.create({
            id: '1p',
            name: 'produto 1',
            description: 'descriptio product 1',
            salesPrice: 80,
            orderId: '1o',
        });

        await ProductModel.create({
            id: '2p',
            name: 'produto 2',
            description: 'descriptio product 2',
            salesPrice: 20,
            orderId: '1o',
        })

        const checkoutRepository =  new CheckoutRepository();
        const order = await checkoutRepository.findOrder('1o');

        expect(order).not.toBeNull();
        expect(order!.client.id.id).toBe('1c');
        expect(order!.products[0].id.id).toBe('1p');
        expect(order!.products[1].id.id).toBe('2p');
        expect(order!.status).toBe('approved');
        expect(order!.total).toBe(100);
        expect(order!.client.address.street).toBe('street 1');
        expect(order!.client.address.number).toBe('number 1');
        expect(order!.client.address.complement).toBe('complement 1');
        expect(order!.client.address.city).toBe('city 1');
        expect(order!.client.address.state).toBe('state 1');
        expect(order!.client.address.zipCode).toBe('12345');
    })
})