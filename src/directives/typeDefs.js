const { gql } = require('apollo-server')

typeDefs = gql`
    enum RoleEnum {
        ADMIN
        USER
    }

    directive @auth(
        role: RoleEnum
    ) on OBJECT | FIELD_DEFINITION

    type User {
        id: ID!
        firstname: String!
        lastname: String!
        email: String!
        password: String!
        role: RoleEnum!
    }

    type Query {
        allUsers: [User]
    }

    type Mutation {
        createUser(data: CreateUserInput): User
        deleteUser(id: ID!): Boolean

        signin(
            email: String!
            password: String!
        ): PayloadAuth
    }

    type PayloadAuth  {
        token: String!
        user: User!
    }

    input CreateUserInput {
        firstname: String!
        lastname: String!
        email: String!
        password: String!
        role: RoleEnum!
    }

`

module.exports = { typeDefs }