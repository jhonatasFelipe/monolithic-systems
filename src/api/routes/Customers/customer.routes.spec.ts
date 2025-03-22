import AddressModel from "../../../modules/customer-adm/repository/address/address.model";
import { app, sequelize } from "./../../express";
import  request  from "supertest";

describe('E2E test from customer',() => {
    
    beforeEach(async () =>{
        await sequelize.sync({ force:true })
    });

    afterAll(async () =>{
        await sequelize.sync();
        await sequelize.close();
    })

    it('should add a new customer', async () => {
        AddressModel.sync();

        const response = await request(app)
           .post('/customers')
           .send({
            name: "Jhonatas",
            email: "emai@teste.com",
            document: "12345",
            address:{
                street: "street teste",
                number: "23",
                city: "belo horizonte",
                state: "estado teste",
                zipCode: "12345",
                complement: "complement"
            }
        });
        expect(response.status).toBe(200);
    });
})