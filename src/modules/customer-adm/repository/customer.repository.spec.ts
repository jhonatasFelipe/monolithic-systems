import { Sequelize } from "sequelize-typescript";
import CustomerModel  from "./customer.model";
import CustomerRepository from "./Customer.repository";
import Customer from "../domain/entity/customer.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

import OrderClientAddressModel from "./address/address.model";
import Address from "../domain/value-object/address.value-object";

describe('Customer-ADM Repository test',  () => { 

    let sequelize: Sequelize;

    beforeEach(async ()=>{
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel, OrderClientAddressModel]);
        await sequelize.sync();
    });

    afterEach(async ()=>{
        await sequelize.close();
    })

    it('should create a customer', async () => {
       
        const customer = new Customer({
            id: new Id('1'),
            name: 'Customer 1',
            email: 'customer1@example.com',
            document: '12345678901',
            address: new Address({
                street: 'Street 1',
                number: '123',
                complement: "complemeto 1",
                city: 'City 1',
                state: 'State 1',
                zipCode:'00000-000',
            }),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const customerRepository = new CustomerRepository();
        await customerRepository.add(customer);

        const customerDb = await CustomerModel.findOne({ where: { id :'1'}, include:[OrderClientAddressModel] });

        expect(customerDb).not.toBeNull();
        expect(customerDb.id).toBe(customer.id.id);
        expect(customerDb.name).toBe(customer.name);
        expect(customerDb.email).toBe(customer.email);
        expect(customerDb.document).toBe(customer.document);
        expect(customerDb.address.street).toBe(customer.address.street);
        expect(customerDb.address.number).toBe(customer.address.number);
        expect(customerDb.address.city).toBe(customer.address.city);
        expect(customerDb.address.state).toBe(customer.address.state);
        expect(customerDb.address.zipCode).toBe(customer.address.zipCode);
        expect(customerDb.createdAt).toBeInstanceOf(Date);
        expect(customerDb.updatedAt).toBeInstanceOf(Date);

    })


    it('should find a customer', async () => {

        const customer = await CustomerModel.create({
            id: '1',
            name: 'Customer 1',
            email: 'customer1@example.com',
            document: '12345678901',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await OrderClientAddressModel.create({
            street: 'Street 1',
            number: '123',
            complement: "complemento 1",
            city: 'City 1',
            state: 'State 1',
            zipCode:'00000-000',
            customerId: '1',
        });

        await customer.reload({
            include: [OrderClientAddressModel]
        })

        const customerRepository = new CustomerRepository();
        const result = await customerRepository.find('1');


        expect(result.id.id).toBe(customer.id);
        expect(result.name).toBe(customer.name);
        expect(result.email).toBe(customer.email);
        expect(result.document).toBe(customer.document);
        expect(result.address.street).toBe(customer.address.street);
        expect(result.address.number).toBe(customer.address.number);
        expect(result.address.city).toBe(customer.address.city);
        expect(result.address.state).toBe(customer.address.state);
        expect(result.address.zipCode).toBe(customer.address.zipCode);
       
    });
})