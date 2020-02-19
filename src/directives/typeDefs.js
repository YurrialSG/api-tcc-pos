const { gql } = require('apollo-server')

typeDefs = gql`
    enum RoleEnum {
        ADMIN
        USER
    }

    enum StatusEnum {
        PENDENTE
        ESPERA
        BANHO
        TOSA
        CONCLUIDO
        CANCELADO
    }

    enum PaymentEnum {
        AGUARDANDO
        PAGO
    }

    enum TypeEnum {
        CACHORRO
        GATO
    }

    directive @auth(
        role: RoleEnum,
        pet: TypeEnum,
        status: StatusEnum,
        payment: PaymentEnum
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
        status: StatusEnum!
        payment: PaymentEnum!
        pet: Pet!
    }

    type Query {
        allUsers: [User]
        allUsersAdmin: [User]
        allPets(user: ID): [Pet]
        allAddress: [Address]
        allService: [Service]
        allServicePendente: [Service]
        allServiceSala: [Service]
        allServiceConcluido: [Service]
        allServiceCancel: [Service]
        allServiceBanho: [Service]
        allServiceTosa: [Service]
    }

    type Mutation {
        createUser(data: CreateUserInput): User
        deleteUser(id: ID!): Boolean

        createPet(data: CreatePetInput): Pet 
        deletePet(id: ID!): Boolean
        onePet(id: ID!): Pet

        createAddress(data: CreateAddressInput): Address
        deleteAddress(id: ID!): Boolean

        createService(data: CreateServiceInput): Service
        updateService(id: ID! data: UpdateServiceInput): Service

        signin(
            email: String!
            password: String!
        ): PayloadAuth
    }

    type PayloadAuth  {
        token: String!
        user: User!
    }

    type Subscription {
        onCreateServices: Service
        onUpdateServices: Service
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
        status: StatusEnum!
        payment: PaymentEnum!
        pet: CreatePetServiceInput!
    }

    input UpdateServiceInput {
        date: String
        schedule: String
        status: StatusEnum
        payment: PaymentEnum
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