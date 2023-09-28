import { gql } from 'graphql-tag'

// Add or update this section
// eslint-disable-next-line @typescript-eslint/no-unused-vars
enum PaymentStatus {
  Paid,
  Unpaid,
}

export const schema = gql`
  type Invoice {
    id: Int!
    amount: Int!
    dueDate: DateTime!
    payerEmail: String
    payerPhone: String!
    currency: String!
    lateFee: Int
    description: String
    status: PaymentStatus # PaymentStatus is used as the type for the status field
    createdAt: DateTime!
  }

  type Query {
    invoices: [Invoice!]! @requireAuth
    invoice(id: Int!): Invoice @requireAuth
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
  }
`
