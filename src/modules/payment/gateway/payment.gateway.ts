import Transaction from "../domain/trasnsaction.entity";

export default interface PaymentGateway {
    save(input: Transaction): Promise<Transaction>
}