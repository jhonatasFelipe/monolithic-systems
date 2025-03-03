
import AddCustomerUseCase from "../usecase/addCustomer/add-customer.usecase"
import FindCustomerUseCase from "../usecase/findCustomer/find-customer.usecase"
import CustomerAdmFacadeInterface, { AddCustomerFacadeInputDto, FindCustomerFacadeInputDto, FindCustomerFacadeOutputDto } from "./customer-adm.facade.interface"

type FacadeProps = {
    addUseCase: AddCustomerUseCase
    findUseCase?: FindCustomerUseCase
}

export default class CustomerAdmFacade implements CustomerAdmFacadeInterface{
    private _addUseCase: AddCustomerUseCase
    private _findUseCase?: FindCustomerUseCase

    constructor(facadeProps: FacadeProps){
        this._addUseCase = facadeProps.addUseCase
        this._findUseCase = facadeProps.findUseCase
    }

    async add(input: AddCustomerFacadeInputDto): Promise<void>{
        await this._addUseCase.execute(input)
    }

    async find(input: FindCustomerFacadeInputDto): Promise<FindCustomerFacadeOutputDto> {
       return await this._findUseCase.execute(input);
    }
}