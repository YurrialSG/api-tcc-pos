const Service = require('../models/service')
const Pet = require('../models/pet')

async function createService(parent, body, context, info) {
    if(body.data.pet) {
        const service = await Service.create(body.data)
        await service.setPet(body.data.pet.id)
        const reloadService = service.reload({ include: [Pet] })
        return reloadService
    }
}

module.exports = { createService }