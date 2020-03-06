const { Sequelize } = require('sequelize')

module.exports = new Sequelize({
    dialect: 'sqlite',
    storage: './dbnow.sqlite',
    logging: true
})