'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, {
        as: "category",
        foreignKey:"category_id"
      });
      Product.hasMany(models.Image, {
        as: "images",
        foreignKey: "product_id"
    });
    Product.hasMany(models.Order, {
      as: "order",
      foreignKey: 'product_id'
      });
      }
  };
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    discount: DataTypes.INTEGER,
    description: DataTypes.STRING,
    brand: DataTypes.STRING,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};