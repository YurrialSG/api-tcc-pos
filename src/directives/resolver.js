const { PubSub } = require('apollo-server')

const User = require('../models/user')
const Pet = require('../models/pet')
const Address = require('../models/address')
const Service = require('../models/service')

const { signin, createUser, deleteUser } = require('../mutations/userMutation')
const { createPet, deletePet, onePet } = require('../mutations/petMutation')
const { createAddress, deleteAddress } = require('../mutations/addressMutation')
const { updateService } = require('../mutations/serviceMutation')

const pubSubData = new PubSub()

const resolver = {
    Query: {
        allUsers() {
            return User.findAll({ where: { role: 'USER' }, include: [Address] })
        },
        allUsersAdmin() {
            return User.findAll({ where: { role: 'ADMIN' }, include: [Address] })
        },
        async allPets(parent, body, context, info) {
            if (context.userId) {
                if (context.roleId !== 'ADMIN') {
                    const petsID = await Pet.findAll({
                        where: { userId: context.userId },
                        include: [User]
                    })
                    if (!petsID) {
                        throw new Error('Pet de usuário não encontrado')
                    }
                    return petsID
                }
            }
            return Pet.findAll({ include: [User] })
        },
        allAddress() {
            return Address.findAll()
        },
        allServicePendente() {
            return Service.findAll({ where: { status: 'PENDENTE' }, include: [Pet] })
        },
        allServiceSala() {
            return Service.findAll({ where: { status: 'ESPERA' }, include: [Pet] })
        },
        allServiceConcluido() {
            return Service.findAll({ where: { status: 'CONCLUIDO' }, include: [Pet] })
        },
        allServiceCancel() {
            return Service.findAll({ where: { status: 'CANCELADO' }, include: [Pet] })
        },
        allServiceBanho() {
            return Service.findAll({ where: { status: 'BANHO' }, include: [Pet] })
        },
        allServiceTosa() {
            return Service.findAll({ where: { status: 'TOSA' }, include: [Pet] })
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
        onePet,

        //mutations Address
        createAddress,
        deleteAddress,

        //mutations Service
        async createService(parent, body, context, info) {
            if (body.data.pet) {
                const service = await Service.create(body.data)
                await service.setPet(body.data.pet.id)
                const reloadService = service.reload({ include: [Pet] })
                pubSubData.publish('createService', {
                    onCreateServices: reloadService
                })
                return reloadService
            }
        },
        updateService,
    },
    Subscription: {
        onCreateServices: {
            subscribe: () => pubSubData.asyncIterator('createService')
        }
    }
}

module.exports = { resolver }