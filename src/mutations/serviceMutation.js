const Service = require('../models/service')

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

module.exports = { updateService }