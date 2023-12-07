export const schema = gql`
  type PaymentResponse {
    status: String!
    message: String!
  }

  type Mutation {
    requestToPay(id: Int!, amount: Float!, currency: String!): PaymentResponse! @skipAuth
  }
`
