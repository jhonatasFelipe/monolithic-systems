import { ProductModel } from "../../../modules/product-adm/reposotory/product.model";
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

    it('should add a new product', async () => {

        ProductModel.sync();
        const response = await request(app)
           .post('/products')
           .send({
            name: "Product teste",
            description: "Description test",
            purchasePrice: 100,
            stock: 100
        });
        expect(response.status).toBe(200);
    });
})