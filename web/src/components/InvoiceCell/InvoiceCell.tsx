import { gql } from 'graphql-tag'

import { useQuery } from '@redwoodjs/web'

// Define your GraphQL query
const QUERY = gql`
  query AllInvoicesQuery {
    invoices {
      id
      amount
      dueDate
      payerEmail
      payerPhone
      currency
      lateFee
      description
    }
  }
`

const InvoiceCell = () => {
  // Use the useQuery hook to fetch data
  const { data, error, loading } = useQuery(QUERY)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error.message}</div>
  }

  const { invoices } = data

  if (!invoices || invoices.length === 0) {
    return <div>No invoices found.</div>
  }

  return (
    <div>
      {invoices.map((invoice: any) => (
        <div key={invoice.id}>
          <p>ID: {invoice.id}</p>
          <p>Amount: {invoice.amount}</p>
          <p>Due Date: {invoice.dueDate}</p>
          <p>Payer Email: {invoice.payerEmail}</p>
          <p>Payer Phone: {invoice.payerPhone}</p>
          <p>Currency: {invoice.currency}</p>
          <p>Late Fee: {invoice.lateFee}</p>
          <p>Description: {invoice.description}</p>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default InvoiceCell
