import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import type { FindPayerQuery, FindPayerQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

const SIGN_INVOICE_MUTATION = gql`
  mutation SignInvoiceMutation($invoiceId: Int!) {
    signInvoice(id: $invoiceId) {
      id
      status
    }
  }
`

export const QUERY = gql`
  query FindPayerQuery($id: Int!) {
    payer(id: $id) {
      id
      invoices {
        id
        amount
        dueDate
        status
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindPayerQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const PayerCell = ({
  payer,
}: CellSuccessProps<FindPayerQuery, FindPayerQueryVariables>) => {
  const [signInvoice] = useMutation(SIGN_INVOICE_MUTATION)
  const [invoices, setInvoices] = useState(payer?.invoices || [])

  const handleSignInvoice = async (invoiceId: number) => {
    try {
      await signInvoice({
        variables: { invoiceId },
      })

      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice.id === invoiceId ? { ...invoice, status: 'Active' } : invoice
        )
      )
    } catch (error) {
      console.error('Error signing invoice:', error)
    }
  }

  const handleEditInvoice = (invoiceId: number) => {
    // Add your logic for editing the invoice here
    console.log(`Editing invoice with ID: ${invoiceId}`)
  }

  return (
    <>
      {/* Render the fetched invoices */}
      {invoices.map((invoice) => (
        <div key={invoice.id}>
          <p>Invoice ID : {invoice.id}</p>
          <p>Amount: {invoice.amount}</p>
          <p>Due: {invoice.dueDate}</p>
          <p>Status: {invoice.status}</p>
          {invoice.status === 'Unsigned' && (
            <>
              <button onClick={() => handleSignInvoice(invoice.id)}>Sign</button>
              <button onClick={() => handleSignInvoice(invoice.id)}>Sign</button>
              <button onClick={() => handleEditInvoice(invoice.id)}>Edit</button>
            </>
          )}
        </div>
      ))}
    </>
  )
}