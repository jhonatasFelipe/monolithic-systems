import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import InvoiceModel from "../invoice/Invoice.model";

@Table({
    tableName: "addresses",
    timestamps: false,
})

export default class AddressModel extends Model {

    @Column({ allowNull: false })
    street: string;

    @Column({ allowNull: false })
    number: string;

    @Column({ allowNull: false })
    complement: string;

    @Column({ allowNull: false })
    city: string;

    @Column({ allowNull: false })
    state: string;

    @Column({ allowNull: false })
    zipCode: string;

    @ForeignKey(()=> InvoiceModel)
    @Column({ allowNull: false })
    invoiceId: number;

}