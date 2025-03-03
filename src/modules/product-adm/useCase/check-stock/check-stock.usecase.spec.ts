import { Sequelize } from "sequelize-typescript";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import ProductRepository from "../../reposotory/product.repository";
import { CheckStockInputDto } from "./check-stock.dto";
import CheckStockUseCase from "./check-stock.usecase";
import { ProductModel } from "../../reposotory/product.model";

describe("check stock of the product unit test", ()=>{
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
    });

    it("should check stock of the product", async  ()=>{

        const productRepository = new ProductRepository();
        const product = new Product({
            id: new Id('1'),
            name: 'Product 1',
            description: 'Product 1 description',
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        productRepository.add(product);

        const useCase = new CheckStockUseCase(productRepository);

        const input: CheckStockInputDto =  {
            productId: '1',
        }

       const result = await useCase.execute(input);

        expect(result.productId).toBe(product.id.id);
        expect(result.stock).toBe(product.stock);
    });
});