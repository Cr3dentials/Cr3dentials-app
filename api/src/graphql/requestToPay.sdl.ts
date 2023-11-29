import { requestToPay } from "src/services/requestToPay"
import { MutationResolvers } from "types/graphql"

export const schema = gql`
  type PaymentResponse {
    status: String!
    message: String!
    transactionStatus: String!
  }

  type Mutation {
    requestToPay(input: RequestToPayInput!): PaymentResponse! @skipAuth
  }

  input RequestToPayInput {
    id: Int!
    amount: Int!
  }
`

export const resolvers: MutationResolvers = {
  Mutation: {
    requestToPay: (_obj, { input }) => {
      return requestToPay(input)
    },
  },
}
