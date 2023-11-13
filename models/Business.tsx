import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database';

/**
 * Business Model
 * Represents a business entity in the system.
 */
class Business extends Model {}

Business.init(
  {
    businessId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,  // Permite que el logo sea nulo
    },
    // ...otros campos según sean necesarios
  },
  {
    sequelize,
    modelName: 'Business',
    tableName: 'businesses',  // Mantener el nombre de la tabla
  }
);

export default Business;
