import { Column, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import AddressModel from "../address/address.model";


@Table({
    tableName: "order-clients",
    timestamps: false,
})
export default class ClientModel extends Model{

    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    email: string;

    @HasOne(()=> require("../address/address.model").default)
    address: any;
}