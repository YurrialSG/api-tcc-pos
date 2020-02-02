const User = require('../models/user')
const Pet = require('../models/pet')
const Address = require('../models/address')
const Service = require('../models/service')

const { signin, createUser, deleteUser } = require('../mutations/userMutation')
const { createPet, deletePet } = require('../mutations/petMutation')
const { createAddress, deleteAddress } = require('../mutations/addressMutation')
const { createService, updateService } = require('../mutations/serviceMutation')

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
        allServicePendente() {
            return Service.findAll({ where: {status: 'PENDENTE'}, include: [Pet] })
        },
        allServiceSala() {
            return Service.findAll({ where: {status: 'ESPERA'}, include: [Pet] })
        },
        allServiceConcluido() {
            return Service.findAll({ where: {status: 'CONCLUIDO'}, include: [Pet] })
        },
        allServiceCancel() {
            return Service.findAll({ where: {status: 'CANCELADO'}, include: [Pet] })
        },
        allServiceBanho() {
            return Service.findAll({ where: {status: 'BANHO'}, include: [Pet] })
        },
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
        updateService,
    }
}

module.exports = { resolver }