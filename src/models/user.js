const { Model, DataTypes } = require('sequelize')
const Sequelize = require('../database')

const Address = require('./address')
class User extends Model {
    static associate() {
        Address.hasMany(User)
        User.belongsTo(Address)
    }
}

User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
}, { sequelize: Sequelize, modelName: 'user' })

User.associate()

module.exports = User