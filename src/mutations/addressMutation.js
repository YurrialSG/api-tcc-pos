const Address = require('../models/address')

async function createAddress(parent, body, context, info) {
    const address = await Address.create(body.data)
    const reloadedAddress = address.reload()
    return reloadedAddress
}

async function deleteAddress(parent, body, context, info) {
    const address = await Address.findOne({
        where: { id: body.id }
    })

    if (!address)
        throw new Error('Address não encontrado')

    await address.destroy()
    return true
}

module.exports = { createAddress, deleteAddress }