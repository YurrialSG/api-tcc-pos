const bcrypt = require('bcrypt')
const User = require('../models/user')

async function createUser(parent, body, context, info) {
    body.data.password = await bcrypt.hash(body.data.password, 10)
    const user = await User.create(body.data)
    const reloadedUser = user.reload()
    return reloadedUser
}

async function deleteUser(parent, body, context, info) {
    const user = await User.findOne({
        where: { id: body.id }
    })

    if (!user)
        throw new Error('Usuário não encontrado')

    await user.destroy()
    return true
}

module.exports = { createUser, deleteUser }