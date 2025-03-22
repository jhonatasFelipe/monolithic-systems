import express, { Express, Request, Response } from "express";
import { FindInvoiceFacadeInputDTO } from "../../../modules/invoice/facade/Invoice.facade.interafce";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/invoice.facade.factory";


export const InvoiceRoutes = express.Router();

InvoiceRoutes.get("/", async(req: Request, res: Response) => {

    try{
        const input: FindInvoiceFacadeInputDTO = {
            id: req.body.id
        }

        const facade = InvoiceFacadeFactory.create();
        const output = await facade.find(input);
        
        res.send(output);

    }catch(error){
        res.status(500).send("An error occurred");
    }

});