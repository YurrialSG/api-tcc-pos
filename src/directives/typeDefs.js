const { gql } = require('apollo-server')

typeDefs = gql`
    enum RoleEnum {
        ADMIN
        USER
    }

    enum TypeEnum {
        CACHORRO
        GATO
    }

    directive @auth(
        role: RoleEnum,
        pet: TypeEnum
    ) on OBJECT | FIELD_DEFINITION

    type User {
        id: ID!
        firstname: String!
        lastname: String!
        email: String!
        password: String!
        role: RoleEnum!
    }

    type Pet {
        id: ID!
        name: String!
        age: Int!
        breed: String!
        pet: TypeEnum!
        user: User!
    }

    type Query {
        allUsers: [User]
        allPets: [Pet]
    }

    type Mutation {
        createUser(data: CreateUserInput): User
        deleteUser(id: ID!): Boolean

        createPet(data: CreatePetInput): Pet
        deletePet(id: ID!): Boolean

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

    input CreatePetInput {
        name: String!
        age: Int!
        breed: String!
        pet: TypeEnum!
        user: CreateUserPetInput
    }

    input CreateUserPetInput {
        id: ID!
    }

`

module.exports = { typeDefs }