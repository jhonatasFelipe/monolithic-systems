import { Column, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: 'customers',
    timestamps: false,
})
export default class CustomerModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    email: string;

    @Column({ allowNull: false })
    document: string;

    @HasOne(()=> require("./address/address.model").default)
    address: any;

    @Column({ allowNull: false })
    createdAt: Date;

    @Column({ allowNull: false })
    updatedAt: Date;
}