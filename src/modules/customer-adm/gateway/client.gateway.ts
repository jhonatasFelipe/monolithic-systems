import Customer from "../domain/customer.entity";

export default interface CustomerGateway {
    add(customer: Customer): Promise<void>;
    find(id: string): Promise<Customer>;
}