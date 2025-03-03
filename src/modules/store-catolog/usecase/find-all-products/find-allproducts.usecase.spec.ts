import { BeforeFindAfterExpandIncludeAll } from "sequelize-typescript";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUseCase from "./find-all-products.usecase";

const product = new Product({
    id: new Id('1'),
    name: 'product name',
    description: 'product description',
    salesPrice: 100
});

const product2 = new Product({
    id: new Id('2'),
    name: 'product2 name',
    description: 'product2 description',
    salesPrice: 200
});


const mockProductGateway = () =>{
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2]))
    }
}


describe('find all products usecase united test ', () => {
    it("Should find all products",async () => {
        const productRepository = mockProductGateway();
        const useCase = new FindAllProductsUseCase(productRepository);

        const result  = await useCase.execute();

        expect(productRepository.findAll).toHaveBeenCalled();
        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe('1');
        expect(result.products[0].name).toBe('product name');
        expect(result.products[0].description).toBe('product description');
        expect(result.products[0].salesPrice).toBe(100);
        expect(result.products[1].id).toBe('2');
        expect(result.products[1].name).toBe('product2 name');
        expect(result.products[1].description).toBe('product2 description');
        expect(result.products[1].salesPrice).toBe(200);

    });

})