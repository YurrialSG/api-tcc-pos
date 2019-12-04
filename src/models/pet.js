const { Model, DataTypes } = require('sequelize')
const Sequelize = require('../database')

const User = require('./user')

class Pet extends Model {
    static associate() {
        User.hasMany(Pet)
        Pet.belongsTo(User)
    }
}

Pet.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    breed: DataTypes.STRING,
    pet: DataTypes.STRING,
}, { sequelize: Sequelize, modelName: 'pet' })

Pet.associate()

module.exports = Pet