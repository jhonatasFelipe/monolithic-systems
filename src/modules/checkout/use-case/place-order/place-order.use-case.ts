import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import CustomerAdmFacadeInterface from "../../../customer-adm/facade/customer-adm.facade.interface";
import InvoiceFacadeInterface from "../../../invoice/facade/Invoice.facade.interafce";
import PaymentFacadeInterface from "../../../payment/facade/facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacade from "../../../store-catolog/facade/store-catolog.facade";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import Address from "../../domain/value-object/address.value-object";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";




export default class PlaceOderUseCase implements UseCaseInterface{

    private _customerFacade: CustomerAdmFacadeInterface;
    private _productFacade: ProductAdmFacadeInterface;
    private _catalogFacade: StoreCatalogFacade;
    private _repository: CheckoutGateway;
    private _invoiceFacade: InvoiceFacadeInterface;
    private _paymentFacade: PaymentFacadeInterface

    constructor(
        customerFacade: CustomerAdmFacadeInterface, 
        productFacade: ProductAdmFacadeInterface,
        catalogFacade: StoreCatalogFacade,
        repository: CheckoutGateway,
        invoiceFacade: InvoiceFacadeInterface,
        paymentFacade: PaymentFacadeInterface
    )
    {
        this._customerFacade = customerFacade;
        this._productFacade = productFacade;
        this._catalogFacade = catalogFacade;
        this._repository = repository;
        this._invoiceFacade = invoiceFacade;
        this._paymentFacade = paymentFacade;
    }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        
        
        const client  =  await this._customerFacade.find({id: input.clientId})

        if(!client){
            throw new Error('Client not found');
        }
       
        await this.validateProducts(input);

        const products = await Promise.all(
            input.products.map((p) => this.getProduct(p.productId)) 
        );

        const muCustomer = new Client({
            id: new Id(),
            name: client.name,
            email: client.email,
            address: new Address(client.address),
        })


        const order = new Order({
            client: muCustomer,
            products,
        })

       const payment = await this._paymentFacade.process({
        orderId: order.id.id,
        amount: order.total,
       });

       const invoice  = 
       payment.status === "Approved" ?
        await this._invoiceFacade.generate({
            name: client.name,
            document: client.document,
            street: client.address.street,
            number: client.address.number,
            complement: client.address.complement,
            city: client.address.city,
            state: client.address.state,
            zipCode: client.address.zipCode,
            items: products.map((p) =>{
                return {
                    id: p.id.id,
                    name: p.name,
                    salesPrice: p.salesPrice
                };
            }),
        }) : null

        payment.status === "Approved" && order.approved();
        this._repository.addOrder(order);


        return {
            Id: order.id.id,
            invoiceId: payment.status === "Approved" ? invoice.id : null,
            status: order.status,
            total: order.total,
            products: order.products.map((p)=>{
                return {
                    productId: p.id.id,
                }
            })
        };
    }


    private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
        if(input.products.length === 0){
            throw new Error('No products selected');
        }

        for(const product of input.products){
            const productStock = await this._productFacade.checkStock({productId: product.productId})

            if(productStock.stock <= 0){
                throw new Error(`Product ${productStock.productId} is not available in stock`)
            }
        }
    }

    private async getProduct(productId: string): Promise<Product> {
        const product = await this._catalogFacade.find({id:productId})
        if(!product){
            throw new Error('Product not found')
        }

        const productProps = {
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        }

        return new Product(productProps);
    }
}