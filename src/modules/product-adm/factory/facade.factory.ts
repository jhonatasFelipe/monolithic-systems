import ProductAdmFacade from "../facade/product-adm.facade";
import ProductRepository from "../reposotory/product.repository";
import AddProductUseCase from "../useCase/add-product/add-product.usecase";
import CheckStockUseCase from "../useCase/check-stock/check-stock.usecase";

export default class ProductAdmFactory{

    static create(){
        const productRepository = new ProductRepository();
        const addProductUseCase = new AddProductUseCase(productRepository);
        const checkStockUseCase = new CheckStockUseCase(productRepository);
        const productFacade = new ProductAdmFacade({
            addUseCase: addProductUseCase,
            checkStockUseCase: checkStockUseCase
        });

        return productFacade;
    }
}
    