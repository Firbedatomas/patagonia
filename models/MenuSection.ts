// MenuSection.ts

import { DataTypes } from 'sequelize';
import sequelize from '../db/database';

const MenuSection = sequelize.define('MenuSection', {
  // Suponiendo que tu clave primaria se llama 'sectionId' y es un autoincremento
  sectionId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sectionName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  businessId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'menu_sections',
  timestamps: true,
});

export default MenuSection;
