import { promises } from "dns";
import Id from "../../@shared/domain/value-object/id.value-object";
import Customer from "../domain/entity/customer.entity";
import Address from "../domain/value-object/address.value-object";
import CustomerGateway from "../gateway/client.gateway";
import CustomerModel from "./customer.model";
import AddressModel from "./address/address.model";

export default class CustomerRepository implements CustomerGateway {
    async add(customer: Customer): Promise<void> {

        await Promise.all(
            [
                CustomerModel.create({
                    id: customer.id.id,
                    name: customer.name,
                    email: customer.email,
                    document: customer.document,
                    createdAt: customer.createdAt,
                    updatedAt: customer.updatedAt,
                }),
        
                AddressModel.create({  
                    street: customer.address.street,
                    number: customer.address.number,
                    complement: customer.address.complement,
                    city: customer.address.city,
                    state: customer.address.state,
                    zipCode: customer.address.zipCode,
                    customerId: customer.id.id,
                })
            ]
        );  
        
    }
    async find(id: string): Promise<Customer> {
        
        const customer = await CustomerModel.findOne({
            where: { id },
            include: [AddressModel]
        })

        if(!customer) throw new Error('Customer not found');

        return new Customer({
            id: new Id(customer.id),
            name: customer.name,
            email: customer.email,
            document: customer.document,
            address : new Address({
                street: customer.address.street,
                number: customer.address.number,
                complement: customer.address.complement,
                city: customer.address.city,
                state: customer.address.state,
                zipCode: customer.address.zipCode,
            }),
            createdAt: customer.createdAt,
            updatedAt: customer.updatedAt,
        });
    }
}