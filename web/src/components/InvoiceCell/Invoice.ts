// web/src/components/Invoice/invoice.ts
import axios from 'axios'
import { gql } from 'graphql-tag'

export const getPaymentHistory = async () => {
  try {
    const response = await axios.get(
      'http://localhost:8918/api/payment-history'
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const createPaymentAgreement = async () => {
  try {
    const response = await axios.get(
      'http://localhost:8918/api/payment-agreement'
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const postLoanAdvance = async (
  customerId,
  bundleName,
  bundleValue,
  amount,
  bundleType
) => {
  try {
    const response = await axios.post(
      `http://localhost:8917/api/developers.mtn.com/customers/${customerId}/loans/advance`,
      {
        bundleName,
        bundleValue,
        amount,
        bundleType,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// Call this function when the component is loaded
getPaymentHistory().then((data) => console.log(data))

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
      status
    }
  }
`

export type InvoiceQuery = {
  invoices: Invoice[]
}

export type Invoice = {
  id: string
  currency: string // Updated field name
  dueDate: string
  payerEmail: string
  payerPhone: string | null // Updated field name
  description: string | null
  amount: string
  lateFee: number | null
  status: PaymentStatus
}

export enum PaymentStatus {
  Paid = 'Paid',
  Overdue = 'Overdue',
  Late = 'Late',
  PaidEarly = 'PaidEarly',
}
