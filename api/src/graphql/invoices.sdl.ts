import { gql } from 'graphql-tag'

export const schema = gql`
  enum PaymentStatus {
    Paid
    Unpaid
    Active
    Unsigned
  }

  type Invoice {
    id: Int!
    dueDate: DateTime!
    payerEmail: String
    payerPhone: String!
    currency: String!
    lateFee: Int
    description: String
    status: PaymentStatus
    createdAt: DateTime!
    amount: Int!
  }

  type Query {
    invoices: [Invoice!]! @requireAuth
    invoice(id: Int!): Invoice @requireAuth
    payer(id: Int!): Payer @requireAuth
  }

  type Payer {
    id: Int!
    email: String!
    phone: String!
    invoices: [Invoice!]!
  }

  input CreateInvoiceInput {
    amount: Int!
    dueDate: DateTime!
    payerEmail: String
    payerPhone: String!
    currency: String!
    lateFee: Int
    description: String
    status: PaymentStatus
  }

  input UpdateInvoiceInput {
    amount: Int
    dueDate: DateTime
    payerEmail: String
    payerPhone: String
    currency: String
    lateFee: Int
    description: String
    status: PaymentStatus
  }

  type Mutation {
    createInvoice(input: CreateInvoiceInput!): Invoice! @requireAuth
    updateInvoice(id: Int!, input: UpdateInvoiceInput!): Invoice! @requireAuth
    deleteInvoice(id: Int!): Invoice! @requireAuth
    signInvoice(id: Int!): Invoice! @requireAuth
  }
`
