import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceModel from "../invoice/Invoice.model";

@Table({ 
    tableName: 'items',
    timestamps: false,
})  
export default class ItemsModel extends Model {

    
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @ForeignKey(()=> InvoiceModel)  // Define the foreign key to the InvoiceModel
    @Column({ allowNull: false })  // Define the foreign key column in the ItemsModel
    invoiceId: string;   // The foreign key column in the ItemsModel

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    price: number;
    
}