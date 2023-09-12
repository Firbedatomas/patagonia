// models/VerificationToken.tsx

import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../db/database';

class VerificationToken extends Model {
  public id!: number;
  public userId!: number;
  public token!: string;
  public expiresAt!: Date;
}

VerificationToken.init(
  {
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
