import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./Invoice.facade.interafce";


type InvoiceFacadeProps = {
    findUseCase : FindInvoiceUseCase,
    generateUseCase: GenerateInvoiceUseCase, 
}
export default class InvoiceFacade implements InvoiceFacadeInterface {

    private findUseCase: FindInvoiceUseCase;
    private generateUseCase: GenerateInvoiceUseCase;

    constructor(props: InvoiceFacadeProps){
        this.findUseCase = props.findUseCase;
        this.generateUseCase = props.generateUseCase;
    }
    generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return this.generateUseCase.execute(input);
    }
    
    find(id: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        return this.findUseCase.execute(id);
    }

}