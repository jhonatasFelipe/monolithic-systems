import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Client from "../client/order-client.model";
import ProductModel from "../products/products.model";

@Table({
    tableName: "Orders",
    timestamps: false
})
export default class OrderModel extends Model{

    @PrimaryKey
    @Column({allowNull: false})
    id: string;

    @ForeignKey(() => Client)
    @Column
    clientId: string;

    @BelongsTo(() => Client)
    client: Client;

    @HasMany(()=> ProductModel)
    products: ProductModel[];

    @Column({ allowNull: false})
    status: string;
}