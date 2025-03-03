import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../repository/transaction.model";
import TransactionRepository from "../repository/transaction.repository";
import PaymentFacade from "./payment.facade";
import ProcessPaymentUseCase from "../usecase/process-payment.usecase";
import PaymentFacadeFactory from "../factory/payment.facade.factory";


describe('ProductRepository test',  () => { 

    let sequelize: Sequelize;

    beforeEach(async ()=>{
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([TransactionModel]);
        await sequelize.sync();
    });

    afterEach(async ()=>{
        await sequelize.close();
    })

    it('should create a transaction', async () => {

        const facade = PaymentFacadeFactory.create();
        
        const input = {
            orderId: 'order-1',
            amount: 100,
        }

        const result =  await facade.process(input);

        expect(result).toBeDefined();
        expect(result.amount).toBe(input.amount);
        expect(result.status).toBe('approved');
        expect(result.orderId).toBe(input.orderId);

    });
});