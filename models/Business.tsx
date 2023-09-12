// db/models/Business.tsx
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/database');

class Business extends Model {}

Business.init({
  businessId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: DataTypes.INTEGER,
  businessName: DataTypes.STRING,
  businessType: DataTypes.STRING,
  // ...otros campos
}, {
  sequelize,
  modelName: 'Business',
  tableName: 'businesses',
});

module.exports = Business;
