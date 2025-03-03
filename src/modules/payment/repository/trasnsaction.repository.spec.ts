import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Transaction from "../domain/trasnsaction.entity";
import TransactionRepository from "./transaction.repository";
import TransactionModel from "./transaction.model";

describe('TransactionRepository test',  () => { 

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
       
        const transaction = new Transaction({
            id: new Id('1'),
            orderId: "1",
            amount: 100,
        });

        transaction.process();

        const paymentRepository = new TransactionRepository();
        const result = await paymentRepository.save(transaction);

        expect(result.id.id).toBe(transaction.id.id);
        expect(result.orderId).toBe("1");
        expect(result.amount).toBe(100);
        expect(result.status).toBe("approved");
        expect(result.createdAt).toBeInstanceOf(Date);
        expect(result.updatedAt).toBeInstanceOf(Date);
    })
})