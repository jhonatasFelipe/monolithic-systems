import PaymentFacade from "../facade/payment.facade";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment.usecase";

export default class PaymentFacadeFactory {
    static create(): PaymentFacade {
        
        const paymentRepository = new TransactionRepository();
        const processUseCase = new ProcessPaymentUseCase(paymentRepository);
        const facade =  new PaymentFacade(processUseCase);
        return facade;
    }
}