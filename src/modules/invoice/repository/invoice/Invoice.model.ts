import { BelongsTo, Column, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import ItemsModel from "../Items/items.model";
import AddressModel from "../address/address.model";


@Table({ 
    tableName: 'invoices',
    timestamps: false,
})
export default class InvoiceModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    document: string;

    @HasOne(()=> AddressModel)
    address: AddressModel;

    @HasMany(()=> ItemsModel)
    items: ItemsModel[];

}