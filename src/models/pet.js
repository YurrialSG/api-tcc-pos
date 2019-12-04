const { Model, DataTypes } = require('sequelize')
const Sequelize = require('../database')

class Pet extends Model { }

Pet.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    breed: DataTypes.STRING,
    pet: DataTypes.STRING,
}, { sequelize: Sequelize, modelName: 'pet' })

module.exports = Pet