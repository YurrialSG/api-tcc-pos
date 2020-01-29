const User = require('../models/user')
const Pet = require('../models/pet')
const Address = require('../models/address')
const Service = require('../models/service')

const { signin, createUser, deleteUser } = require('../mutations/userMutation')
const { createPet, deletePet } = require('../mutations/petMutation')
const { createAddress, deleteAddress } = require('../mutations/addressMutation')
const { createService } = require('../mutations/serviceMutation')

const resolver = {
    Query: {
        allUsers() {
            return User.findAll({ where: {role: 'USER'}, include: [Address] })
        },
        allUsersAdmin(){
            return User.findAll({ where: {role: 'ADMIN'}, include: [Address] })
        },
        allPets() {
            return Pet.findAll({ include: [User] })
        },
        allAddress() {
            return Address.findAll()
        },
        allService() {
            return Service.findAll({ include: [Pet] })
        },
        allServiceStart() {
            return Service.findAll({ where: {status: 'PENDENTE'}, include: [Pet] })
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
        deleteAddress,

        //mutations Service
        createService,
    }
}

module.exports = { resolver }