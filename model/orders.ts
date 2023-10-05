import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface ordersAttributes {
  id?: number;
  userid?: number;
  totalproduct?: number;
  totalprice?: string;
  createdat?: Date;
  updateat?: Date;
}

@Table({ tableName: 'orders', schema: 'public', timestamps: false })
export class orders
  extends Model<ordersAttributes, ordersAttributes>
  implements ordersAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('orders_id_seq'::regclass)"),
  })
  id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  userid?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  totalproduct?: number;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  totalprice?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  createdat?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  updateat?: Date;
}
