import type { Prisma, Invoice } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.InvoiceCreateArgs>({
  invoice: {
    one: {
      data: {
        amount: 2056215.9009348701,
        dueDate: '2023-09-21T19:14:03.103Z',
        payerEmail: 'String',
        currency: 'String',
      },
    },
    two: {
      data: {
        amount: 662277.7215288434,
        dueDate: '2023-09-21T19:14:03.103Z',
        payerEmail: 'String',
        currency: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Invoice, 'invoice'>
