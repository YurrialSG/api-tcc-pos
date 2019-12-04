const User = require('../models/user')
const Pet = require('../models/pet')

const { createUser, deleteUser } = require('../mutations/userMutation')
const { createPet, deletePet } = require('../mutations/petMutation')

const resolver = {
    Query: {
        allUsers() {
            return User.findAll()
        },
        allPets() {
            return Pet.findAll({ include: [User] })
        }
    },
    Mutation: {
        //mutations User
        createUser,
        deleteUser,

        //mutations Pet
        createPet,
        deletePet,
    }
}

module.exports = { resolver }