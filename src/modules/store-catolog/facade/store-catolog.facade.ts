import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import { FindProductInputDto } from "../usecase/find-product/find-product.dto";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface from "./store-catalog.facade.interface";


type facadeProps = {
    findProductUseCase: FindProductUseCase;
    findAllProductsUseCase: FindAllProductsUseCase;
}
export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {

    private _findProductUseCase: FindProductUseCase;
    private _findAllProductsUseCase: FindAllProductsUseCase;

    constructor(facadeProps: facadeProps) {
        this._findProductUseCase = facadeProps.findProductUseCase;
        this._findAllProductsUseCase = facadeProps.findAllProductsUseCase;
    }

    async find(FindProps: FindProductInputDto) {
        return this._findProductUseCase.execute(FindProps);
    }

    async findAll() {
        return this._findAllProductsUseCase.execute();
    }

}