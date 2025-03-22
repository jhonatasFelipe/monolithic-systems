import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import CustomerModel from "../customer.model";

@Table({
    tableName: "client_addresses",
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

    @PrimaryKey
    @ForeignKey(() => CustomerModel)
    @Column({ allowNull: false})
    customerId: string;

}