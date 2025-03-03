import Id from "../../@shared/domain/value-object/id.value-object"
import Transaction from "../domain/trasnsaction.entity"
import ProcessPaymentUseCase from "./process-payment.usecase"


const transaction = new Transaction({
    id: new Id("1"),
    orderId: "1",
    amount: 100,
    status: "approved",
})

const mockRepository = ()=>{
    return {
        save: jest.fn().mockResolvedValue(transaction)
    }
}

const transaction2 = new Transaction({
    id: new Id("2"),
    orderId: "2",
    amount: 50,
    status: "decline",
})

const mockRepositoryDeclined = ()=>{
    return {
        save: jest.fn().mockResolvedValue(transaction2)
    }
}
describe("Process payment usecase init test", ()=>{
    it("it should approve transactions", async ()=>{
    
        const paymentRepository = mockRepository();
        const useCase = new ProcessPaymentUseCase(paymentRepository);

        const input = {
            orderId: "1",
            amount: 100
        }

        const result  =  await useCase.execute(input);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.transactionId).toBe(transaction.id.id);
        expect(result.orderId).toBe("1");
        expect(result.amount).toBe(100);
        expect(result.status).toBe("approved");  
        expect(result.createdAt).toBe(transaction.createdAt);
        expect(result.updatedAt).toBe(transaction.updatedAt);

    }),

    it("it should decline transactions ", async ()=>{
    
        const paymentRepository = mockRepositoryDeclined();
        const useCase = new ProcessPaymentUseCase(paymentRepository);

        const input = {
            orderId: "2",
            amount: 50
        }

        const result  =  await useCase.execute(input);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.transactionId).toBe(transaction2.id.id);
        expect(result.orderId).toBe("2");
        expect(result.amount).toBe(50);
        expect(result.status).toBe("decline");  
        expect(result.createdAt).toBe(transaction2.createdAt);
        expect(result.updatedAt).toBe(transaction2.updatedAt);

    })
})