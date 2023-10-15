import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/database';

class Business extends Model {
  id: any;
}

Business.init({
  businessId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: DataTypes.INTEGER,
  businessName: DataTypes.STRING,
  businessType: DataTypes.STRING,
  address: DataTypes.STRING,
  logo: DataTypes.STRING, // Asegúrate de que este campo esté configurado correctamente
  // ...otros campos
}, {
  sequelize,
  modelName: 'Business',
  tableName: 'businesses',
});


export default Business;
