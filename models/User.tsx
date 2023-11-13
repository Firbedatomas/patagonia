import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database';

/**
 * User Model
 * Represents a user in the system.
 */
class User extends Model {
  public id!: number;
  public businessName!: string;
  public fullName!: string;
  public phoneNumber!: string;
  public email!: string;
  public password!: string;
  public timezone!: string;
  public languagePreference!: string;
  public verificationToken!: string;
  public verified!: number;  
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 15],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timezone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    languagePreference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verificationToken: {
      type: DataTypes.STRING,
    },
    verified: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0  
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);


export default User;
