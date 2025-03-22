import { Model, Table,Column,PrimaryKey } from "sequelize-typescript";

@Table({
    tableName: 'products_adm',
    timestamps: false,
    underscored: true
})
export class ProductModel extends Model {
   
    @PrimaryKey
    @Column({ allowNull: false})
    id: string;

    @Column({ allowNull: false})
    name: string;

    @Column({allowNull: false})
    description: string;

    @Column({allowNull: false})
    purchasePrice: number;

    @Column({allowNull: false})
    stock: number;

    @Column({allowNull: false})
    createdAt: Date;

    @Column({allowNull: false})
    updatedAt: Date;
}