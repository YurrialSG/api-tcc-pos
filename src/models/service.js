const { Model, DataTypes } = require('sequelize')
const Sequelize = require('../database')

const Pet = require('./pet')

class Service extends Model {
    static associate() {
        Pet.hasMany(Service)
        Service.belongsTo(Pet)
    }
}

Service.init({
    date: DataTypes.STRING,
    schedule: DataTypes.STRING,
    status: DataTypes.STRING,
    payment: DataTypes.STRING,
}, { sequelize: Sequelize, modelName: 'service' })

Service.associate()

module.exports = Service