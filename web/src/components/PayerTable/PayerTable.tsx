import { gql } from '@apollo/client'

import { useQuery } from '@redwoodjs/web'

const ALL_INVOICES_QUERY = gql`
  query AllInvoices {
    invoices {
      id
      dueDate
      payerEmail
      payerPhone
      currency
      lateFee
      description
      status
      createdAt
      amount
    }
  }
`

const PayerTable = () => {
  const { data, loading, error } = useQuery(ALL_INVOICES_QUERY)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    console.error(error)
    return <div>Error loading invoices</div>
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th> {/* New header for the button */}
          </tr>
        </thead>
        <tbody>
          {data.invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.dueDate}</td>
              <td>{invoice.status}</td>
              <td>
                <button>Pay</button> {/* New cell with a button */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PayerTable
