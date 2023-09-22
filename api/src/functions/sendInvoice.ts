// api/src/functions/sendInvoice.ts
import { createInvoice } from 'src/services/invoices'

export const handler = async (event) => {
  try {
    const data = JSON.parse(event.body)
    const invoice = await createInvoice(data)
    return {
      statusCode: 200,
      body: JSON.stringify(invoice),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred' }),
    }
  }
}
