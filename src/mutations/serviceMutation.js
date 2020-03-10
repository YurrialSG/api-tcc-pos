const Service = require('../models/service')

async function findOneService(parent, body, context, info) {
    const serviceOne = Service.findOne({
        where: { date: body.data.date, schedule: body.data.schedule }
    })

    console.log(serviceOne)

    if (!serviceOne)
        throw new Error('Service não encontrado')

    return serviceOne
}

module.exports = { findOneService }