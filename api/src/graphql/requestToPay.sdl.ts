export const schema = gql`
  type PaymentResponse {
    status: String!
    message: String!
    transactionStatus: String!
  }

  type Mutation {
    requestToPay: PaymentResponse! @skipAuth
  }
`
