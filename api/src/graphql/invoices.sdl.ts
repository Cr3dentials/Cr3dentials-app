import { gql } from 'graphql-tag'

export const schema = gql`
  enum PaymentStatus {
    Paid
    Unpaid
    Active
    Unsigned
  }

  type Invoice {
    id: String!
    dueDate: DateTime!
    payerEmail: String
    payerPhone: String!
    currency: String!
    lateFee: Int
    description: String
    status: PaymentStatus
    createdAt: DateTime!
    amount: String!
  }

  type Query {
    invoices: [Invoice!]! @requireAuth
    invoice(id: String!): Invoice @requireAuth
    payer(id: String!): Payer @requireAuth
  }

  type Payer {
    id: String!
    email: String!
    phone: String!
    invoices: [Invoice!]!
  }

  input CreateInvoiceInput {
    amount: String!
    dueDate: DateTime!
    payerEmail: String
    payerPhone: String!
    currency: String!
    lateFee: Int
    description: String
    status: PaymentStatus
  }

  input UpdateInvoiceInput {
    amount: String!
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
    updateInvoice(id: String!, input: UpdateInvoiceInput!): Invoice!
      @requireAuth
    deleteInvoice(id: String!): Invoice! @requireAuth
    signInvoice(id: String!): Invoice! @requireAuth
  }
`
