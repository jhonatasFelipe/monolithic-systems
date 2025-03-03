import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import { checkStockFacadeInputDto, checkStockFacadeOutputDto } from "../../facade/product-adm.facade.interface";
import ProductGateway from "../../gateway/product.gateay";
import ProductRepository from "../../reposotory/product.repository";

export default class CheckStockUseCase implements UseCaseInterface {

    private _productRepository: ProductGateway;

    constructor(productRepository: ProductRepository) {
        this._productRepository = productRepository;
    }
    
    async execute(input:checkStockFacadeInputDto): Promise<checkStockFacadeOutputDto> {
        const product = await this._productRepository.find(input.productId);
        return {
            productId: product.id.id,
            stock: product.stock
        };
    }
}