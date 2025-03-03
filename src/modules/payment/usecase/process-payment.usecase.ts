import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import Transaction from "../domain/trasnsaction.entity";
import PaymentGateway from "../gateway/payment.gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.usecase.dto";

export default class ProcessPaymentUseCase implements UseCaseInterface {

    constructor(
        private transactionRepository: PaymentGateway
    ){}

    async execute(input:ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto>{

        const transaction = new Transaction({
            orderId: input.orderId,
            amount: input.amount
        })

        transaction.process();

        const savedTransaction = await this.transactionRepository.save(transaction);

        return {
            transactionId: savedTransaction.id.id,
            orderId: savedTransaction.orderId,
            amount: savedTransaction.amount,
            status: savedTransaction.status,
            createdAt: savedTransaction.createdAt,
            updatedAt: savedTransaction.updatedAt
        }
    }
}
    