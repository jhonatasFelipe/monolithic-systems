import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import productGateway from "../../gateway/product.gateway";
import { FindAllProductsDto } from "./find-all-products.dto";

export default class FindAllProductsUseCase implements UseCaseInterface {
    constructor(private productRepository: productGateway) {}

    async execute(): Promise<FindAllProductsDto> {
        const products = await this.productRepository.findAll();
        return {
            products: products.map(product => ({
                id: product.id.id,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice
            }))
        }
    }
}