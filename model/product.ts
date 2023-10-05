import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface productAttributes {
  id?: number;
  nama_produk?: string;
  description?: string;
  categoryid?: number;
  product_price?: string;
  image?: string;
  createdat?: Date;
  updateat?: Date;
}

@Table({ tableName: 'product', schema: 'public', timestamps: false })
export class product
  extends Model<productAttributes, productAttributes>
  implements productAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('product_id_seq'::regclass)"),
  })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  nama_produk?: string;

  @Column({ allowNull: true, type: DataType.STRING(200) })
  description?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  categoryid?: number;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  product_price?: string;

  @Column({ allowNull: true, type: DataType.STRING(200) })
  image?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  createdat?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  updateat?: Date;
}
