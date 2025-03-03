import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import ProductAdmFacadeInterface, { AddProductFacadeInputDto, checkStockFacadeInputDto, checkStockFacadeOutputDto } from "./product-adm.facade.interface";


export interface UseCaseProps{
    addUseCase: UseCaseInterface;
    checkStockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {

    private _addUseCase: UseCaseInterface;
    private _checkStockUseCase: UseCaseInterface;

    constructor(useCaseProps: UseCaseProps){
        this._addUseCase = useCaseProps.addUseCase;
        this._checkStockUseCase = useCaseProps.checkStockUseCase;
      
    }
    async addProduct(input: AddProductFacadeInputDto): Promise<void> {
        this._addUseCase.execute(input);
    }
    async checkStock(input: checkStockFacadeInputDto): Promise<checkStockFacadeOutputDto> {
       return await this._checkStockUseCase.execute(input);
    }
}