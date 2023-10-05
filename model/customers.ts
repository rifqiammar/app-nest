import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface customersAttributes {
  id?: number;
  firstname?: string;
  lastname?: string;
  userid?: number;
  createdat?: Date;
  updateat?: Date;
}

@Table({ tableName: 'customers', schema: 'public', timestamps: false })
export class customers
  extends Model<customersAttributes, customersAttributes>
  implements customersAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('customers_id_seq'::regclass)"),
  })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  firstname?: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  lastname?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  userid?: number;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  createdat?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  updateat?: Date;
}
