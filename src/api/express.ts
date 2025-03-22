import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { customerRoutes } from "./routes/Customers/customer.routes";
import CustomerModel from "../modules/customer-adm/repository/customer.model";
import OrderClientAddressModel from "../modules/customer-adm/repository/address/address.model";
import { ProductRoutes } from "./routes/Products/Product.routes";
import { checkoutRoutes } from "./routes/checkout/checkout.routes";
import { ProductModel as ProductModelAdm } from "../modules/product-adm/reposotory/product.model";
import { ProductModel as ProductModelStore} from "../modules/store-catolog/repository/product.model";
import ClientModel from "../modules/checkout/repository/client/order-client.model";
import ProductModel from "../modules/checkout/repository/products/products.model";
import OrderModel from "../modules/checkout/repository/order/order.model";
import AddressModel from "../modules/checkout/repository/address/address.model";
import TransactionModel from "../modules/payment/repository/transaction.model";
import InvoiceModel from "../modules/invoice/repository/invoice/Invoice.model";
import ItemsModel from "../modules/invoice/repository/Items/items.model";
import InvoiceAddressModel from "../modules/invoice/repository/address/address.model";
import { InvoiceRoutes } from "./routes/Invoice/invoice.routes";

export const app: Express = express();
app.use(express.json());

app.use('/customers', customerRoutes);
app.use('/products', ProductRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/invoice', InvoiceRoutes);

export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
    });
    await sequelize.addModels([
        CustomerModel,
        OrderClientAddressModel,
        ProductModelAdm,
        ClientModel,
        ProductModel,
        OrderModel,
        AddressModel,
        ProductModelStore,
        TransactionModel,
        ProductModel,
        InvoiceModel,
        ItemsModel,
        InvoiceAddressModel
    ]);
    await sequelize.sync();
}

setupDb();

