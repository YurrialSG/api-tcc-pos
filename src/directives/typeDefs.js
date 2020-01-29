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

    type Service {
        id: ID!
        date: String!
        schedule: String!
        status: String!
        payment: String!
        pet: Pet!
    }

    type Query {
        allUsers: [User]
        allUsersAdmin: [User]
        allPets: [Pet]
        allAddress: [Address]
        allService: [Service]
        allServiceStart: [Service]
    }

    type Mutation {
        createUser(data: CreateUserInput): User
        deleteUser(id: ID!): Boolean

        createPet(data: CreatePetInput): Pet 
        deletePet(id: ID!): Boolean

        createAddress(data: CreateAddressInput): Address
        deleteAddress(id: ID!): Boolean

        createService(data: CreateServiceInput): Service

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

    input CreateServiceInput {
        date: String!
        schedule: String!
        status: String!
        payment: String!
        pet: CreatePetServiceInput!
    }

    input CreateAddressUserInput {
        id: ID!
    }

    input CreateUserPetInput {
        id: ID!
    }

    input CreatePetServiceInput {
        id: ID!
    }

`

module.exports = { typeDefs }