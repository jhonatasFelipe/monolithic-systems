import { Sequelize } from "sequelize-typescript";
import AddressModel from "../../customer-adm/repository/address/address.model";
import CustomerModel from "../../customer-adm/repository/customer.model";
import { ProductModel as ProductCatalogModel} from "../../store-catolog/repository/product.model";
import { ProductModel } from "../../product-adm/reposotory/product.model";
import { PlaceOrderFacadeInputDto } from "./place-order.facade.interface";
import PlaceOrderFacadeFactory from "../Factory/place-order.factory";
import TransactionModel from "../../payment/repository/transaction.model";
import ClientModel from "../repository/client/order-client.model";
import OrderClientAddressModel from "../repository/address/address.model";
import OrderModel from "../repository/order/order.model";
import ProductOrderModel from "../repository/products/products.model";


describe('Facade checkout',() => {

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
                    CustomerModel,
                    AddressModel,
                    ProductOrderModel,
                    ProductCatalogModel,
                    TransactionModel,
                    ClientModel,
                    OrderClientAddressModel,
                    OrderModel,
                    ProductModel,
                ]
            );
           await sequelize.sync();
       });
   
       afterEach(async ()=>{
            await sequelize.sync();
            await sequelize.close();
       })

    it('should add a new checkout', async () => {

        ProductModel.sync();
        ProductCatalogModel.sync();
        AddressModel.sync();
        OrderModel.sync();
        OrderClientAddressModel.sync();
        ProductOrderModel.sync();

        const customer = await CustomerModel.create({
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
            customerId: customer.id
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

        const input: PlaceOrderFacadeInputDto =  {
            clientId: customer.id,
            products:[                                                                                                                                                   
                { productId:productAdm1.id }, 
                { productId:productAdm2.id }
            ]
        }
        
        const facade = PlaceOrderFacadeFactory.create();
        const output = await facade.placeOrder(input);

        expect(output.products.length).toBe(2);
        expect(output.total).toBe(200);
        expect(output.status).toBe('Pending');
    
       
    });
});
