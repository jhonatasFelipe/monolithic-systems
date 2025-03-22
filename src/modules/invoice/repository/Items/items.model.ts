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

    @ForeignKey(()=> InvoiceModel) 
    @Column({ allowNull: false })  
    invoiceId: string;   

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    salesPrice: number;
    
}