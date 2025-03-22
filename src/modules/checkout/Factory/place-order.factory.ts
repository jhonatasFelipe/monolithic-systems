import CustomerAdmFacadeFactory from "../../customer-adm/factory/Customer-adm.facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/invoice.facade.factory";
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory";
import ProductAdmFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../store-catolog/factory/facade.factory";
import PlaceOrderFacade from "../Facade/place-order.facade";
import CheckoutRepository from "../repository/checkout.repository";
import PlaceOderUseCase from "../use-case/place-order/place-order.use-case";

export default class PlaceOrderFacadeFactory {

    static create(): PlaceOrderFacade{

            const customerFacade = CustomerAdmFacadeFactory.create();
            const productFacade = ProductAdmFactory.create();
            const catalogFacade = StoreCatalogFacadeFactory.create();
            const invoiceFacade = InvoiceFacadeFactory.create();
            const paymentFacade = PaymentFacadeFactory.create();
            const checkoutRepository = new CheckoutRepository();

        const placeOrderUseCase = new PlaceOderUseCase(
            customerFacade,
            productFacade,
            catalogFacade,
            checkoutRepository,
            invoiceFacade,
            paymentFacade
        );
        return new PlaceOrderFacade(placeOrderUseCase);
    }
}