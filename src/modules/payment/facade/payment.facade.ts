import ProcessPaymentUseCase from "../usecase/process-payment.usecase";
import PaymentFacadeInterface, { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
    constructor(
        private processUseCase: ProcessPaymentUseCase 
    ) {}
    async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
        const transaction = await this.processUseCase.execute(input);
        return {
            id: transaction.transactionId,
            orderId: transaction.orderId,
            amount: transaction.amount,
            status: transaction.status,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt,
        };
    }
}