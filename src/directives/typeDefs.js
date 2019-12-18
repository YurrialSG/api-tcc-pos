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

    type Address {
        id: ID!
        street: String!
        number: Int!
        complement: Int
        zip_code: String!
    }

    type User {
        id: ID!
        firstname: String!
        lastname: String!
        email: String!
        password: String!
        role: RoleEnum!
        address: Address
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
        allUsersAdmin: [User]
        allPets: [Pet]
        allAddress: [Address]
    }

    type Mutation {
        createUser(data: CreateUserInput): User
        deleteUser(id: ID!): Boolean

        createPet(data: CreatePetInput): Pet 
        deletePet(id: ID!): Boolean

        createAddress(data: CreateAddressInput): Address
        deleteAddress(id: ID!): Boolean

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
        address: CreateAddressUserInput
    }

    input CreatePetInput {
        name: String!
        age: Int!
        breed: String!
        pet: TypeEnum!
        user: CreateUserPetInput
    }

    input CreateAddressInput {
        street: String!
        number: Int!
        complement: Int
        zip_code: String!
    }

    input CreateAddressUserInput {
        id: ID!
    }

    input CreateUserPetInput {
        id: ID!
    }

`

module.exports = { typeDefs }