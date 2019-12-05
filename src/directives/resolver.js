const User = require('../models/user')
const Pet = require('../models/pet')
const Address = require('../models/address')

const { signin, createUser, deleteUser } = require('../mutations/userMutation')
const { createPet, deletePet } = require('../mutations/petMutation')
const { createAddress } = require('../mutations/addressMutation')

const resolver = {
    Query: {
        allUsers() {
            return User.findAll({ include: [Address] })
        },
        allPets() {
            return Pet.findAll({ include: [User] })
        },
        allAddress() {
            return Address.findAll()
        }
    },
    Mutation: {
        //mutations User
        signin,
        createUser,
        deleteUser,

        //mutations Pet
        createPet,
        deletePet,

        //mutations Address
        createAddress,
    }
}

module.exports = { resolver }