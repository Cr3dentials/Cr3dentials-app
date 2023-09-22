// web/src/components/Invoice/invoice.ts
import { gql } from 'graphql-tag'

export const QUERY = gql`
  query InvoiceQuery {
    invoices {
      id
      currency
      dueDate
      payerEmail
      payerPhone
      description
      amount
      lateFee
    }
  }
`

export type InvoiceQuery = {
  invoices: Invoice[]
}

export type Invoice = {
  id: number
  currency: string // Updated field name
  dueDate: string
  payerEmail: string
  payerPhone: string | null // Updated field name
  description: string | null
  amount: number
  lateFee: number | null
}
