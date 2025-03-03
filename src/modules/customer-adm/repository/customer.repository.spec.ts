import { Sequelize } from "sequelize-typescript";
import CustomerModel  from "./customer.model";
import CustomerRepository from "./Customer.repository";
import Customer from "../domain/customer.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

describe('ProductRepository test',  () => { 

    let sequelize: Sequelize;

    beforeEach(async ()=>{
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel]);
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
            address: 'Customer 1 address',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const customerRepository = new CustomerRepository();
        await customerRepository.add(customer);

        const customerDb = await CustomerModel.findOne({ where: { id :'1'} });
        expect(customerDb).not.toBeNull();
        expect(customerDb.id).toBe(customer.id.id);
        expect(customerDb.name).toBe(customer.name);
        expect(customerDb.email).toBe(customer.email);
        expect(customerDb.address).toBe(customer.address);
        expect(customerDb.createdAt).toBeInstanceOf(Date);
        expect(customerDb.updatedAt).toBeInstanceOf(Date);


    })


    it('should find a customer', async () => {

        const customer = await CustomerModel.create({
            id: '1',
            name: 'Customer 1',
            email: 'customer1@example.com',
            address: 'Customer 1 address',
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const customerRepository = new CustomerRepository();
        const result = await customerRepository.find('1');
        expect(result.id.id).toBe(customer.id);
        expect(result.name).toBe(customer.name);
        expect(result.email).toBe(customer.email);
        expect(result.address).toBe(customer.address);
       
    });
})