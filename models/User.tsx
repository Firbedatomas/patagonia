// /Applications/MAMP/htdocs/ta-app/models/User.tsx
import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database';

class User extends Model {}

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
    // Considera agregar aquí otras configuraciones del modelo si son necesarias
  }
);

export default User;
