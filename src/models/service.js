const { Model, DataTypes } = require('sequelize')
const Sequelize = require('../database')

const Pet = require('./pet')
const User = require('./user')

class Service extends Model {
    static associate() {
        Pet.hasMany(Service)
        Service.belongsTo(Pet)

        User.hasMany(Service)
        Service.belongsTo(User)
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