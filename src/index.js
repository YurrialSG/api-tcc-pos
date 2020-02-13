const { ApolloServer } = require('apollo-server')
const Sequelize = require('./database')
const jwt = require('jsonwebtoken')
const AuthDirective = require('./directives/auth')
const { typeDefs } = require('./directives/typeDefs')
const { resolver } = require('./directives/resolver')
const User = require('./models/user')

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolver,
    schemaDirectives: {
        auth: AuthDirective
    },
    introspection: true,
    //context: ({ req, res }) => ({req, res})
    async context({ req, connection }) {
        if (connection) {
            return connection.context
        }
        const token = req.headers.authorization
        // console.log(token)

        if (token) {
            const jwtData = jwt.decode(token.replace('Bearer ', ''))
            const { id } = jwtData

            const user = await User.findOne({
                where: { id }
            })

            return {
                headers: req.headers,
                userId: user.id,
                roleId: user.role
            }
        } else {
            return {
                headers: req.headers
            }
        }
    }
});

Sequelize.sync().then(() => {
    server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
})

