import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import ClientModel from "../client/order-client.model";

@Table({
    tableName: "order_client_addresses",
    timestamps: false,
})

export default class OrderClientAddressModel extends Model {

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

    @ForeignKey(() => ClientModel)
    @Column({ allowNull: false , primaryKey: true })
    clientId: string;
}