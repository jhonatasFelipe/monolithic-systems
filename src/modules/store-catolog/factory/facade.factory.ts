import StoreCatalogFacade from "../facade/store-catolog.facade";
import ProductRepository from "../repository/product.repository";
import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";

export default class StoreCatalogFacadeFactory {
    static create():StoreCatalogFacade {
        const productRepository = new ProductRepository();
        const findUseCase = new FindProductUseCase(productRepository);
        const findAllUseCase = new FindAllProductsUseCase(productRepository);

        return new StoreCatalogFacade({
            findProductUseCase: findUseCase, 
            findAllProductsUseCase:findAllUseCase
        });
    }
} 