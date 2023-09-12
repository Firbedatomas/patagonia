// models/User.tsx
import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database';

class User extends Model {
  public id!: number; // Asumiendo que hay una columna de ID autoincremental
  public businessName!: string;
  public fullName!: string;
  public phoneNumber!: string;
  public email!: string;
  public password!: string;
  public timezone!: string; // Nuevo campo
  public languagePreference!: string; // Nuevo campo
  public verificationToken!: string;  // Nuevo campo
  
  // Puedes agregar otros campos aquí según tus necesidades
}

User.init(
  {
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
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timezone: {  // Nuevo campo
      type: DataTypes.STRING,
      allowNull: false,
    },
    languagePreference: {  // Nuevo campo
      type: DataTypes.STRING,
      allowNull: false, 
    },
    verified: {
      type: DataTypes.NUMBER,
      defaultValue: false,
    },
    verificationToken: {
      type: DataTypes.STRING,
      allowNull: true,  // Puede ser NULL si el usuario aún no ha sido verificado
    },
    // Puedes agregar otros campos aquí según tus necesidades
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;
