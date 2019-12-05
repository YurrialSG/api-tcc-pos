const { Model, DataTypes } = require('sequelize')
const Sequelize = require('../database')

class Address extends Model { }

Address.init({
    street: DataTypes.STRING,
    number: DataTypes.INTEGER,
    complement: DataTypes.INTEGER,
    zip_code: DataTypes.STRING,
}, { sequelize: Sequelize, modelName: 'address' })

module.exports = Address