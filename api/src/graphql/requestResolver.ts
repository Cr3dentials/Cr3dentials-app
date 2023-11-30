import { requestToPay } from '../services/requestToPay'

export const resolvers = {
  Mutation: {
    requestToPay: async (_parent, _args, _context, _info) => {
      const invoice = {}
      return await requestToPay(invoice)
    },
  },
}
