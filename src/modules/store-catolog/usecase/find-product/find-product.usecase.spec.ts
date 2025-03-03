import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUseCase from "./find-product.usecase";

const product  =  new Product({
    id: new Id('1'),
    name: 'product name',
    description: 'product description',
    salesPrice: 100
})


const mockProductRepository = () =>{
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn()
    }
}

describe("find a product usecase unit test", () => {
    it('Should find a product', async () => {

        const productRepository = mockProductRepository();
        const useCase = new FindProductUseCase(productRepository);
        const input = {
            id: '1'
        }

        const result = await useCase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(result.id).toBe('1');
        expect(result.name).toBe('product name');
        expect(result.description).toBe('product description');
        expect(result.salesPrice).toBe(100);
    })

});