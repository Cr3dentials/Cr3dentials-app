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
  }

  input UpdateInvoiceInput {
    amount: Int
    dueDate: DateTime
    payerEmail: String
    payerPhone: String
    currency: String
    lateFee: Int
    description: String
  }

  type Mutation {
    createInvoice(input: CreateInvoiceInput!): Invoice! @requireAuth
    updateInvoice(id: Int!, input: UpdateInvoiceInput!): Invoice! @requireAuth
    deleteInvoice(id: Int!): Invoice! @requireAuth
  }
`
