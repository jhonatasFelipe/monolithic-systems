import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice/invoice.repository";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";

export default class InvoiceFacadeFactory {

    static create(): InvoiceFacade {

        const repository = new InvoiceRepository();
        const facade = new InvoiceFacade({
            findUseCase: new FindInvoiceUseCase(repository),
            generateUseCase: new GenerateInvoiceUseCase(repository),
        });
        return facade;
    }
}