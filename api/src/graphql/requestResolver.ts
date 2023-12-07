import { requestToPay } from '../services/requestToPay'

export const resolvers = {
  Mutation: {
    requestToPay: async (_parent, { amount, currency }, _context, _info) => {
      const invoice = { amount, currency }
      return await requestToPay(invoice)
    },
  },
}
