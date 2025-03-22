import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../repository/customer.model";
import CustomerAdmFacadeFactory from "../factory/Customer-adm.facade.factory";
import AddressModel from "../repository/address/address.model";

describe('Customer Facade test',  () => { 

    let sequelize: Sequelize;

    beforeEach(async ()=>{
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel, AddressModel]);
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
            document: '00000',
            address : {
                street: "street 1",
                number: "number 1",
                city: "city 1",
                state: "state 1",
                zipCode: "999999-99",
                complement: "complemento 1"
            }
        }

        await facade.add(input);

        const customerDb = await CustomerModel.findOne({ where: { id :'1'} });

        expect(customerDb).toBeDefined();
        expect(customerDb.id).toBe(input.id);
        expect(customerDb.name).toBe(input.name);
        expect(customerDb.email).toBe(input.email);

    });

    it('should find a customer', async () => {
        const facade = CustomerAdmFacadeFactory.create();

        const input = {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            document: '00000',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await CustomerModel.create(input);

        const addressInput = {
            street: "street 1",
            number: "number 1",
            city: "city 1",
            state: "state 1",
            zipCode: "999999-99",
            customerId: '1',
            complement: "complemento 1"
        }

        await  AddressModel.create(addressInput);

        const inputFacade = {
            id: '1',
        }
        const customer = await facade.find(inputFacade);

        expect(customer).toBeDefined();
        expect(customer.id).toBe(input.id);
        expect(customer.name).toBe(input.name);
        expect(customer.email).toBe(input.email);
        expect(customer.document).toBe(input.document);
        expect(customer.address.street).toBe(addressInput.street);
        expect(customer.address.number).toBe(addressInput.number);
        expect(customer.address.city).toBe(addressInput.city);
        expect(customer.address.state).toBe(addressInput.state);
        expect(customer.address.zipCode).toBe(addressInput.zipCode);
        expect(customer.address.complement).toBe(addressInput.complement);

    });
});