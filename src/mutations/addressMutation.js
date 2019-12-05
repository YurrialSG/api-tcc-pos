const Address = require('../models/address')

async function createAddress(parent, body, context, info) {
    const address = await Address.create(body.data)
    const reloadedAddress = address.reload()
    return reloadedAddress
}

module.exports = { createAddress }