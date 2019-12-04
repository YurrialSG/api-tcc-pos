const Pet = require('../models/pet')

async function createPet(parent, body, context, info) {
    const pet = await Pet.create(body.data)
    const reloadedPet = pet.reload()
    return reloadedPet
}

module.exports = { createPet }