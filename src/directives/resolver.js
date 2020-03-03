const { PubSub } = require('apollo-server')

const User = require('../models/user')
const Pet = require('../models/pet')
const Address = require('../models/address')
const Service = require('../models/service')

const { signin, createUser, deleteUser, oneUser } = require('../mutations/userMutation')
const { createPet, deletePet, onePet } = require('../mutations/petMutation')
const { createAddress, deleteAddress } = require('../mutations/addressMutation')

const pubSubData = new PubSub()
const pubSub = new PubSub()

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
        async allService(parent, body, context, info) {
            if (context.userId) {
                const servicesID = await Service.findAll({
                    where: { userId: context.userId },
                    include: [Pet, User]
                })
                if (!servicesID) {
                    throw new Error('Serviços de usuário não encontrado')
                }
                return servicesID
            }
            return Service.findAll({ include: [Pet, User] })
        },
        allServicePendente() {
            return Service.findAll({ where: { status: 'PENDENTE' }, include: [Pet] })
        },
        allServiceSala() {
            return Service.findAll({ where: { status: 'ESPERA' }, include: [Pet] })
        },
        async allServiceConcluido(parent, body, context, info) {
            if (context.userId) {
                const servicesID = await Service.findAll({
                    where: {
                        userId: context.userId,
                        status: 'CONCLUIDO',
                    },
                    include: [Pet]
                })
                if (!servicesID) {
                    throw new Error('Serviços de usuário não encontrado')
                }
                return servicesID
            }
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
        oneUser,

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
                await service.setUser(body.data.user.id)
                const reloadService = service.reload({ include: [Pet, User] })
                pubSubData.publish('createService', {
                    onCreateServices: reloadService
                })
                return reloadService
            }
        },
        async updateService(parent, body, context, info) {
            const serviceWhereID = await Service.findOne({
                where: { id: body.id }
            })

            if (!serviceWhereID) {
                throw new Error('Serviço não encontrado')
            }

            const updatedService = await serviceWhereID.update(body.data)
            const reloadUpdateService = updatedService.reload({ include: [Pet, User] })
            pubSub.publish('updateService', {
                onUpdateServices: reloadUpdateService
            })
            return reloadUpdateService
        },
    },
    Subscription: {
        onCreateServices: {
            subscribe: () => pubSubData.asyncIterator('createService')
        },
        onUpdateServices: {
            subscribe: () => pubSub.asyncIterator('updateService')
        }
    }
}

module.exports = { resolver }