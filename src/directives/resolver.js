const User = require('../models/user')

const { createUser, deleteUser } = require('../mutations/userMutation')

const resolver = {
    Query: {
        allUsers() {
            return User.findAll()
        },
    },
    Mutation: {
        createUser,
        deleteUser,
    }
}

module.exports = { resolver }