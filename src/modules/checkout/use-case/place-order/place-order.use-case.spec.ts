
import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import { PlaceOrderInputDto } from "./place-order.dto";
import PlaceOderUseCase from "./place-order.use-case"


const mockDate = new Date(200, 1, 1) 
describe('Place order use case unit test', () => {

    describe ("getProducts method", ()=>{

        beforeAll(() => {
            jest.useFakeTimers({
                legacyFakeTimers: false, // Use modern fake timers
                now: mockDate.getTime(),
            });
        });
    
        afterAll(()=>{
            jest.useRealTimers();
        })

        //@ts-expect-error - no params in constructor
        const placeOrderUseCase = new PlaceOderUseCase();

        it("should throw an error when product not found", async () => {

            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue(null)
            }

            // @ts-expect-error - force set catalogFacade
            placeOrderUseCase["_catalogFacade"] = mockCatalogFacade;

            await expect(placeOrderUseCase["getProduct"]("0")).rejects.toThrow(
                new Error('Product not found')
            );
        });


        it("should return a product", async () => {

            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue({
                    id: "0",
                    name: "Product 0",
                    description: "Product 0 description",
                    salesPrice: 0,
                })
            }

            // @ts-expect-error - force set catalogFacade
            placeOrderUseCase["_catalogFacade"] = mockCatalogFacade;

            await expect(placeOrderUseCase["getProduct"]("0")).resolves.toEqual(
                new Product({
                    id: new Id("0"),
                    name: "Product 0",
                    description: "Product 0 description",
                    salesPrice: 0,
                })
            );
            expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1);
        });
        
    });

    describe("Validate products method",() => {
        //@ts-expect-error - no params in constructor
        const placeOrderUseCase = new PlaceOderUseCase();
        it("should throw an error if no products are selected", ()=>{

            const input: PlaceOrderInputDto = {
                clientId: "0",
                products: [],
            }

            expect(() => placeOrderUseCase["validateProducts"](input)).rejects.toThrow(
                new Error('No products selected')
            );
        })


        it("should not throw an error when product is out of stock ", async ()=>{
            const mockProductFacade = {
                checkStock: jest.fn(({productId}: {productId: string}) => 
                    Promise.resolve({
                        productId,
                        stock: productId === "1" ? 0 : 1
                    })      
                ),
            };


            //@ts-expect-error - force set productFacade
            placeOrderUseCase["_productFacade"] = mockProductFacade;

            let input: PlaceOrderInputDto = {
                clientId: "0",
                products: [{ productId: "1"} ]
            }

            await expect(placeOrderUseCase["validateProducts"](input))
            .rejects.toThrow( new Error("Product 1 is not available in stock"))

            input  = {
                clientId: "0",
                products: [{ productId: "0"}, {productId: "1"} ]
            }

            await expect(placeOrderUseCase["validateProducts"](input))
            .rejects.toThrow( new Error("Product 1 is not available in stock")) 

            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);

            input  = {
                clientId: "0",
                products: [{ productId: "0"}, {productId: "1"}, { productId: "2"}]
            }

            await expect(placeOrderUseCase["validateProducts"](input))
            .rejects.toThrow( new Error("Product 1 is not available in stock")) 

            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(5);

        });

    });

    describe('execute method', ( ) => {
        beforeAll(() => {
            jest.useFakeTimers({
                legacyFakeTimers: false, // Use modern fake timers
                now: mockDate.getTime(),
            });
        });
    
        afterAll(()=>{
            jest.useRealTimers();
        });



        it('should throw error when client not found', async () => {
    
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(null),
            }

            //@ts-expect-error - no params in constructor
            const placeOderUseCase =  new PlaceOderUseCase();

            //@ts-expect-error - force set ClientFacade
            placeOderUseCase["_customerFacade"] = mockClientFacade;

            const input: PlaceOrderInputDto = {
                clientId: "0",
                products: [],
            }

            await expect(placeOderUseCase.execute(input)).rejects.toThrow(
                new Error('Client not found')
            );

        });

        it('should throw an error when products are not valid ', async () =>{
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(true),
            }

            //@ts-expect-error - no params in constructor
            const placeOderUseCase =  new PlaceOderUseCase();

            const mockValidateProducts =  jest 
            //@ts-expect-error - spy on private method
            .spyOn(placeOderUseCase, "validateProducts")
            //@ts-expect-error - not return never
            .mockRejectedValue(new Error("No products selected"));

           //@ts-expect-error - force set ClientFacade
           placeOderUseCase["_customerFacade"] = mockClientFacade;

           const input: PlaceOrderInputDto = {
               clientId: "1",
               products: [],
           }

           await expect(placeOderUseCase.execute(input)).rejects.toThrow(
               new Error("No products selected")
           );
        });


        describe("Place an order", () => {

            const ClientProps = {
                id: "1c",
                name: "Client 1",
                document: "00000",
                address : {
                    street: "street",
                    number: "123",
                    city: "city",
                    state: "state",
                    complement: "complemet",
                    zipCode: "00000",
                }
            }
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(ClientProps),
            }

            const mockPaymentFacade = {
                process: jest.fn()
            }

            const mockCheckoutRepo = {
                addOrder: jest.fn()
            }

            const mockInvoiceFacade = {
                generate: jest.fn().mockResolvedValue({id: "1c"})
            }


            const placeOrderUseCase = new PlaceOderUseCase(
                mockClientFacade as any,
                null,
                null,
                mockCheckoutRepo as any,
                mockInvoiceFacade as any,
                mockPaymentFacade as any,
            )

            const products = {
                "0": new Product({
                    id: new Id("0"),
                    name: "Product 0",
                    description: "Product 0 description",
                    salesPrice: 60,
                }),
                "1": new Product({
                    id: new Id("1"),
                    name: "Product 1",
                    description: "Product 1 description",
                    salesPrice: 10,
                }),
            }

            const mockValidateProducts = jest
            //@ts-expect-error - spy on private method
            .spyOn(placeOrderUseCase,"validateProducts")
            //@ts-expect-error - spy on private method
            .mockResolvedValue(null);

            const mockGetProduct = jest
            //@ts-expect-error - spy on private method
            .spyOn(placeOrderUseCase,"getProduct")
            //@ts-expect-error - spy on private method
            .mockImplementation((productId: keyof typeof products) =>{
                return products[productId];
            })

           it("should not be approved", async () => {
                mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
                    transactionId:"1t",
                    orderId: "1o",
                    amount: 100,
                    status: 'error',
                    createdAt: new Date(),
                    updatedAt: new Date()
                });

                const input: PlaceOrderInputDto = {
                    clientId: "1c",
                    products: [{productId:"0"},{productId: "1"}, ],
                };

                let output = await placeOrderUseCase.execute(input);

                expect(output.invoiceId).toBeNull();
                expect(output.total).toBe(70);
                expect(output.products).toStrictEqual([
                    { productId: "0"},
                    { productId: "1"},
                    
                ]);
                expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
                expect(mockClientFacade.find).toHaveBeenCalledWith({ id: "1c"});
                expect(mockValidateProducts).toHaveBeenCalledTimes(1);
                expect(mockValidateProducts).toHaveBeenCalledWith(input);
                expect(mockGetProduct).toHaveBeenCalledTimes(2);
                expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(1);
                expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
                expect(mockPaymentFacade.process).toHaveBeenCalledWith({
                    orderId: output.Id,
                    amount: output.total
                });

                expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(0);

           });


           it("should be approved", async () => {

            mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
                transactionId:"1t",
                orderId: "1o",
                amount: 100,
                status:'Approved',
                createdAt: new Date(),
                updatedAt: new Date()
            });

            const input: PlaceOrderInputDto = {
                clientId: "1c",
                products: [{productId:"0"},{productId: "1"}],
            };

            let output = await placeOrderUseCase.execute(input);
            
            expect(output.invoiceId).toBe("1c");
            expect(output.total).toBe(70);
            expect(output.products).toStrictEqual([
                { productId: "0"},
                { productId: "1"},
               
            ]);
            expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
            expect(mockClientFacade.find).toHaveBeenCalledWith({ id: "1c"});
            expect(mockValidateProducts).toHaveBeenCalledTimes(1);
            expect(mockGetProduct).toHaveBeenCalledTimes(2);
            expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(1);
            expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
            expect(mockPaymentFacade.process).toHaveBeenCalledWith({
                orderId: output.Id,
                amount: output.total
            });
            expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(1);
            expect(mockInvoiceFacade.generate).toHaveBeenCalledWith({
                name: ClientProps.name,
                document: ClientProps.document,
                street: ClientProps.address.street,
                number: ClientProps.address.number,
                city: ClientProps.address.city,
                complement: ClientProps.address.complement,
                state: ClientProps.address.state,
                zipCode: ClientProps.address.zipCode,
                items:  [
                            { id: products["0"].id.id, name: products["0"].name, salesPrice: products["0"].salesPrice },
                            { id: products["1"].id.id, name: products["1"].name, salesPrice: products["1"].salesPrice },
                        ]
            });

           })


        });
    
    })
})