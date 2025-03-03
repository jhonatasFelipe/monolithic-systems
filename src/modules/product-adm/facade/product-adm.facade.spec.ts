import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../reposotory/product.model";
import ProductRepository from "../reposotory/product.repository";
import AddProductUseCase from "../useCase/add-product/add-product.usecase";
import ProductAdmFacade from "./product-adm.facade";
import ProductAdmFactory from "../factory/facade.factory";


describe('ProductADM facade test',  () => { 

    let sequelize: Sequelize;

    beforeEach(async ()=>{
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async ()=>{
        await sequelize.close();
    })

    it('should create a product', async () => {

       
        const productFacade = ProductAdmFactory.create();

        const input  = {
            id: '1',
            name: 'Product 1',
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10
        }

        productFacade.addProduct(input);

        const productDb = await ProductModel.findOne({
            where: { id: '1'}
        });

        expect(input.id).toBe(productDb.id);
        expect(input.name).toBe(productDb.name);
        expect(input.description).toBe(productDb.description);
        expect(input.purchasePrice).toBe(productDb.purchasePrice);
        expect(input.stock).toBe(productDb.stock);
    });


    it('should create a product', async () => {

       
        const productFacade = ProductAdmFactory.create();

        const input  = {
            id: '1',
            name: 'Product 1',
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10
        }

        productFacade.addProduct(input);

        const result  = await productFacade.checkStock({productId: '1'});

        expect(result.productId).toBe(input.id);
        expect(result.stock).toBe(input.stock);
    });
});