import dotenv from "dotenv";
import { app } from "./express";
import { customerRoutes } from "./routes/Customers/customer.routes";
import { ProductRoutes } from "./routes/Products/Product.routes";
import { checkoutRoutes } from "./routes/checkout/checkout.routes";
import { InvoiceRoutes } from "./routes/Invoice/invoice.routes";


dotenv.config();
const port:number = Number(process.env.PORT) || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use('/customer', customerRoutes);
app.use('/product', ProductRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/invoice', InvoiceRoutes);



