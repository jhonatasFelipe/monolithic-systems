import express, { Request, response, Response} from "express";
import { AddCustomerFacadeInputDto, FindCustomerFacadeInputDto } from "../../../modules/customer-adm/facade/customer-adm.facade.interface";
import CustomerAdmFacadeFactory from "../../../modules/customer-adm/factory/Customer-adm.facade.factory";

export const customerRoutes = express.Router();

customerRoutes.post("/", async (req: Request, res: Response) => {

    try{
        const input: AddCustomerFacadeInputDto = {
            name: req.body.name,
            email: req.body.email,
            document: req.body.document,
            address:{
                street: req.body.address.street,
                number: req.body.address.number,
                city: req.body.address.city,
                state: req.body.address.state,
                zipCode: req.body.address.zipCode,
                complement: req.body.address.complement
            }
        };
    
        const facade = CustomerAdmFacadeFactory.create()
        await facade.add(input);
    
        res.send({ created : true});
    }catch(error){
        res.status(500).send('An error occurred');
    }
    
});


customerRoutes.get("/:id",async (req: Request, res: Response) => {

    try{
        const input: FindCustomerFacadeInputDto = {
            id: req.params.id
        };
    
        const facade = CustomerAdmFacadeFactory.create()
        const output = await facade.find(input);
        res.json(output);
    }catch(error){
        res.send(error);
    }
    
});
