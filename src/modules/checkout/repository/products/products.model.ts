import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "../order/order.model";

@Table({ 
    tableName: 'order-products',
    timestamps: false,
})  
export default class ProductModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false })
    id: string;
    
    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false })  
    orderId: string;
  
    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    description: string;

    @Column({ allowNull: false })
    salesPrice: number;
    
}