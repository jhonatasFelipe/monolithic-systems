import Customer from "../domain/entity/customer.entity";

export default interface CustomerGateway {
    add(customer: Customer): Promise<void>;
    find(id: string): Promise<Customer>;
}