import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import Address from "../domain/value-object/address.value-object";
import CheckoutGateway from "../gateway/checkout.gateway";
import OrderClientAddressModel from "./address/address.model";
import AddressModel from "./address/address.model";
import ClientModel from "./client/order-client.model";
import OrderModel from "./order/order.model";
import ProductModel from "./products/products.model";

export default class CheckoutRepository implements CheckoutGateway {
    async addOrder(order: Order): Promise<void> {
       
        const result = await Promise.all([

            await ClientModel.create({
                id: order.client.id.id,
                name: order.client.name,
                email: order.client.email,
            }),
    
          
        
            await OrderModel.create({
                id: order.id.id,
                clientId: order.client.id.id,
                status: order.status,
                total: order.total,
            }),
    
           
        ]);

        order.products.forEach(async (product) => {
            await ProductModel.create({
                id: product.id.id,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice,
                orderId: order.id.id,
            })
        })

   
        await OrderClientAddressModel.create({
            street: order.client.address.street,
            number: order.client.address.number,
            complement: order.client.address.complement,
            city: order.client.address.city,
            state: order.client.address.state,
            zipCode: order.client.address.zipCode,
            clientId: order.client.id.id
        });

    }

    async findOrder(id: string): Promise<Order | null> {
        const order = await OrderModel.findOne({
            where: { id },
            include: [
            {
                model: ClientModel,
                include: [AddressModel]
            },
            ProductModel
            ]
        });

        if(!order) return null;

        const address  =  new Address({
            street: order?.client?.address?.street,
            number: order?.client?.address?.number,
            complement: order?.client?.address?.complement,
            city: order?.client?.address?.city,
            state: order?.client?.address?.state,
            zipCode: order?.client?.address?.zipCode,
        })

        const client = new Client({
            id: new Id(order?.client?.id),
            name: order?.client?.name,
            email: order?.client?.email,
            address,
        })

        const products = order?.products?.map((product) => new Product({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        }));

        return new Order({
            id: new Id(order.id),
            client,
            products: products || [],
            status: order.status
        })
    }

    
}