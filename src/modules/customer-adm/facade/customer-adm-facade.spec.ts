import { CreatedAt, Sequelize } from "sequelize-typescript";
import CustomerModel from "../repository/customer.model";
import CustomerRepository from "../repository/Customer.repository";
import AddCustomerUseCase from "../usecase/addCustomer/add-customer.usecase";
import CustomerAdmFacade from "./customer-adm.facede";
import FindCustomerUseCase from "../usecase/findCustomer/find-customer.usecase";
import CustomerAdmFacadeFactory from "../factory/Customer-adm.facade.factory";

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
        const facade = CustomerAdmFacadeFactory.create();
        const input = {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            address: 'address 1'
        }

        await facade.add(input);

        const customerDb = await CustomerModel.findOne({ where: { id :'1'} });

        expect(customerDb).toBeDefined();
        expect(customerDb.id).toBe(input.id);
        expect(customerDb.name).toBe(input.name);
        expect(customerDb.email).toBe(input.email);

    });

    it('should create a customer', async () => {
        const facade = CustomerAdmFacadeFactory.create();

        const input = {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            address: 'address 1',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await CustomerModel.create(input);

        const inputFacade = {
            id: '1',
        }
        const customer = await facade.find(inputFacade);

        expect(customer).toBeDefined();
        expect(customer.id).toBe(input.id);
        expect(customer.name).toBe(input.name);
        expect(customer.email).toBe(input.email);
        expect(customer.address).toBe(input.address);

    });
});