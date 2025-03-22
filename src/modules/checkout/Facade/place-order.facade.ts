import PlaceOderUseCase from "../use-case/place-order/place-order.use-case";
import PlaceOrderFacadeInterface, { PlaceOrderFacadeInputDto, PlaceOrderFacadeOutputDto } from "./place-order.facade.interface";

export default class PlaceOrderFacade implements PlaceOrderFacadeInterface {

    private _placeOrderUseCase: PlaceOderUseCase;

    constructor(placeOrderUseCase: PlaceOderUseCase){

        this._placeOrderUseCase = placeOrderUseCase;
    }

    async placeOrder(input: PlaceOrderFacadeInputDto): Promise<PlaceOrderFacadeOutputDto> {

       return this._placeOrderUseCase.execute(input);
    }
}