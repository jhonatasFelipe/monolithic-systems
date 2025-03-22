
import express, { Request, response, Response} from "express";
import { PlaceOrderInputDto } from "../../../modules/checkout/use-case/place-order/place-order.dto";
import PlaceOderUseCase from "../../../modules/checkout/use-case/place-order/place-order.use-case";
import PlaceOrderFacadeFactory from "../../../modules/checkout/Factory/place-order.factory";


export const checkoutRoutes = express.Router();

checkoutRoutes.post("/", async (req:Request, res: Response) => {

    try{
       
        const input: PlaceOrderInputDto = {
            clientId: req.body.clientId,
            products: req.body.products
        }

        const facade = PlaceOrderFacadeFactory.create();
        const output = await facade.placeOrder(input);

        res.json(output);

        
    }catch(error){
        console.log(error);
        res.status(500).send('An error occurred');
        
    }
    

});