const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Address = require('../models/address')
const User = require('../models/user')

async function signin(parent, body, context, info) {
    const user = await User.findOne({
        where: { email: body.email }
    })

    if (user) {
        const isCorrect = await bcrypt.compare(body.password, user.password)

        if (!isCorrect)
            throw new Error('Senha inválida')

        const token = jwt.sign({ id: user.id }, 'secret')

        return {
            token,
            user
        }
    }
}

async function createUser(parent, body, context, info) {
    body.data.password = await bcrypt.hash(body.data.password, 10)
    const user = await User.create(body.data)
    if (body.data.address) {
        await user.setAddress(body.data.address.id)
        const reloadedUser = user.reload({ include: [Address] })
        return reloadedUser
    }
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

async function oneUser(parent, body, context, info) {
    const userOne = User.findOne({
        where: { id: body.id },
        include: [Address]
    })

    if (!userOne)
        throw new Error('Usuário não encontrado')

    return userOne
}

module.exports = { signin, createUser, deleteUser, oneUser }