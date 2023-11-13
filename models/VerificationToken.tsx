import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database';

/**
 * VerificationToken Model
 * Represents the token used for email verification.
 */
class VerificationToken extends Model {
  public id!: number;
  public userId!: number;
  public token!: string;
  public expiresAt!: Date;
}

VerificationToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'VerificationToken',
  }
);


export default VerificationToken;
