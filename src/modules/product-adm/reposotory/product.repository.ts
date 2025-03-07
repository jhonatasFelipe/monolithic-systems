import ProductGateway from "../gateway/product.gateay";
import Product from "../domain/product.entity";
import { ProductModel } from "./product.model";
import Id from "../../@shared/domain/value-object/id.value-object";

export default class ProductRepository implements ProductGateway{
    async add(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }

    async find(id: string): Promise<Product> {
        
        const product = await ProductModel.findOne({
            where: { id }
        });

        if(!product){
            throw new Error('Product not found');
        }

        return new Product({
            id:  new Id(product.id), 
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        });
    }
}