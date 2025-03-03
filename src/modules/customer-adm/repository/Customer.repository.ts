import Id from "../../@shared/domain/value-object/id.value-object";
import Customer from "../domain/customer.entity";
import CustomerGateway from "../gateway/client.gateway";
import CustomerModel from "./customer.model";

export default class CustomerRepository implements CustomerGateway {
    async add(customer: Customer): Promise<void> {
        await CustomerModel.create({
            id: customer.id.id,
            name: customer.name,
            email: customer.email,
            address: customer.address,
            createdAt: customer.createdAt,
            updatedAt: customer.updatedAt,
        });
    }
    async find(id: string): Promise<Customer> {
        
        const customer = await CustomerModel.findOne({
            where: { id }
        })

        if(!customer) throw new Error('Customer not found');

        return new Customer({
            id: new Id(customer.id),
            name: customer.name,
            email: customer.email,
            address: customer.address,
            createdAt: customer.createdAt,
            updatedAt: customer.updatedAt,
        });
    }
}