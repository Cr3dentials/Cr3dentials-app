import type { Prisma, Invoice } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.InvoiceCreateArgs>({
  invoice: {
    one: {
      data: {
        amount: 702207,
        dueDate: '2023-09-22T10:57:06.618Z',
        payerPhone: 'String',
        currency: 'String',
      },
    },
    two: {
      data: {
        amount: 3485330,
        dueDate: '2023-09-22T10:57:06.618Z',
        payerPhone: 'String',
        currency: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Invoice, 'invoice'>
