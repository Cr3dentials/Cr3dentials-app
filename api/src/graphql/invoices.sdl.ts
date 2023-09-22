export const schema = gql`
  type Invoice {
    id: Int!
    amount: Float!
    dueDate: DateTime!
    payerEmail: String!
    payerPhone: String
    currency: String!
    lateFee: Float
    description: String
    createdAt: DateTime!
  }

  type Query {
    invoices: [Invoice!]! @requireAuth
    invoice(id: Int!): Invoice @requireAuth
  }

  input CreateInvoiceInput {
    amount: Float!
    dueDate: DateTime!
    payerEmail: String!
    payerPhone: String
    currency: String!
    lateFee: Float
    description: String
  }

  input UpdateInvoiceInput {
    amount: Float
    dueDate: DateTime
    payerEmail: String
    payerPhone: String
    currency: String
    lateFee: Float
    description: String
  }

  type Mutation {
    createInvoice(input: CreateInvoiceInput!): Invoice! @requireAuth
    updateInvoice(id: Int!, input: UpdateInvoiceInput!): Invoice! @requireAuth
    deleteInvoice(id: Int!): Invoice! @requireAuth
  }
`
