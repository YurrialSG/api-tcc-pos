const User = require('../models/user')
const Pet = require('../models/pet')

const { createUser, deleteUser } = require('../mutations/userMutation')
const { createPet } = require('../mutations/petMutation')

const resolver = {
    Query: {
        allUsers() {
            return User.findAll()
        },
        allPets() {
            return Pet.findAll()
        }
    },
    Mutation: {
        //mutations User
        createUser,
        deleteUser,

        //mutations Pet
        createPet,
    }
}

module.exports = { resolver }