import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

// Define the PaymentStatus enum
enum PaymentStatus {
  Paid = 'Paid',
  Overdue = 'Overdue',
  Active = 'Active',
  Unsigned = 'Unsigned',
  PaidEarly = 'PaidEarly',
}

export const invoices: QueryResolvers['invoices'] = () => {
  return db.invoice.findMany()
}

export const invoice: QueryResolvers['invoice'] = ({ id }) => {
  return db.invoice.findUnique({
    where: { id },
  })
}

export const createInvoice: MutationResolvers['createInvoice'] = async ({
  input,
}) => {
  try {
    console.log('Received input:', input)

    const result = await db.invoice.create({
      data: {
        ...input,
        amount: input.amount, // no need to convert amount to string, it should already be a string
        status: PaymentStatus.Unsigned,
      },
    })

    console.log('Created invoice:', result)

    return result
  } catch (error) {
    console.error('Error creating invoice:', error)
    throw error
  }
}

export const updateInvoice: MutationResolvers['updateInvoice'] = ({
  id,
  input,
}) => {
  const data = {
    ...input,
    status: PaymentStatus.Active,
  }
  if (input.amount) {
    data.amount = input.amount // no need to convert amount to string, it should already be a string
  }
  return db.invoice.update({
    data,
    where: { id },
  })
}

export const deleteInvoice: MutationResolvers['deleteInvoice'] = ({ id }) => {
  return db.invoice.delete({
    where: { id },
  })
}

export const signInvoice: MutationResolvers['signInvoice'] = async ({ id }) => {
  const invoice = await db.invoice.findUnique({ where: { id } })
  if (!invoice) {
    throw new Error('Invoice not found')
  }

  const updatedInvoice = await db.invoice.update({
    where: { id },
    data: { status: PaymentStatus.Active },
  })

  return updatedInvoice
}
