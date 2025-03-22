import express, { Express, Request, Response } from "express";
import { AddProductFacadeInputDto } from "../../../modules/product-adm/facade/product-adm.facade.interface";
import ProductAdmFactory from "../../../modules/product-adm/factory/facade.factory";


export const ProductRoutes = express.Router();

ProductRoutes.post("/", (req: Request, res: Response) => {

    try{
        const input: AddProductFacadeInputDto = {
            name: req.body.name,
            description: req.body.description,
            purchasePrice: req.body.purchasePrice,
            stock: req.body.stock
        }

        const facade = ProductAdmFactory.create();
        const output = facade.addProduct(input);

        res.send(output);

    }catch(error){
        res.status(500).send("An error occurred");
    }

});




