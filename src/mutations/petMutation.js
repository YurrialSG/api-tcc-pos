const Pet = require('../models/pet')
const User = require('../models/user')

async function createPet(parent, body, context, info) {
    if (body.data.user) {
        const pet = await Pet.create(body.data)
        await pet.setUser(body.data.user.id)
        const reloadedPet = pet.reload({ include: [User] })
        return reloadedPet
    }
}

async function deletePet(parent, body, context, info) {
    const pet = await Pet.findOne({
        where: { id: body.id }
    })

    if (!pet)
        throw new Error('Pet não encontrado')

    await pet.destroy()
    return true
}

async function onePet(parent, body, context, info) {
    const petOne = Pet.findOne({
        where: { id: body.id }
    })

    if (!petOne)
        throw new Error('Pet não encontrado')

    return petOne
}

module.exports = { createPet, deletePet, onePet }