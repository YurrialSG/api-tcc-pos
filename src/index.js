const { ApolloServer, gql } = require('apollo-server')
const Sequelize = require('./database')
const AuthDirective = require('./directives/auth')
const { typeDefs } = require('./directives/typeDefs')
const { resolver } = require('./directives/resolver')

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolver,
    schemaDirectives: {
        auth: AuthDirective
    },

    async context({ req, connection }) {
        if (connection) {
            return connection.context
        }

        return {
            headers: req.headers,
        }
    }
});


Sequelize.sync().then(() => {
    server.listen()
        .then(() => {
            console.log(`🚀 Server ready at port http://localhost:4000/api`);
        })
})