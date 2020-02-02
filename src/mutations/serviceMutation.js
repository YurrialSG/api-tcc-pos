const Service = require('../models/service')
const Pet = require('../models/pet')

async function createService(parent, body, context, info) {
    if (body.data.pet) {
        const service = await Service.create(body.data)
        await service.setPet(body.data.pet.id)
        const reloadService = service.reload({ include: [Pet] })
        return reloadService
    }
}

async function updateService(parent, body, context, info) {
    const serviceWhereID = await Service.findOne({
        where: { id: body.id }
    })

    if (!serviceWhereID) {
        throw new Error('Serviço não encontrado')
    }

    const updatedService = await serviceWhereID.update(body.data)
    return updatedService
}

module.exports = { createService, updateService }