import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

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
    // Log input data to see what's being received
    console.log('Received input:', input)

    const result = await db.invoice.create({
      data: {
        ...input,
        status: 'Unsigned',
      },
    })

    // Log the result or other relevant data
    console.log('Created invoice:', result)

    return result
  } catch (error) {
    // Log any errors that occur
    console.error('Error creating invoice:', error)
    throw error
  }
}

export const updateInvoice: MutationResolvers['updateInvoice'] = ({
  id,
  input,
}) => {
  return db.invoice.update({
    data: {
      ...input,
      status: 'Active', // Set the payment status to a valid value
    },
    where: { id },
  })
}

export const deleteInvoice: MutationResolvers['deleteInvoice'] = ({ id }) => {
  return db.invoice.delete({
    where: { id },
  })
}

export const signInvoice: MutationResolvers['signInvoice'] = async ({ id }) => {
  const invoice = await db.invoice.findUnique({ where: { id: Number(id) } })
  if (!invoice) {
    throw new Error('Invoice not found')
  }

  const updatedInvoice = await db.invoice.update({
    where: { id: Number(id) },
    data: { status: 'Active' },
  })

  return updatedInvoice
}
