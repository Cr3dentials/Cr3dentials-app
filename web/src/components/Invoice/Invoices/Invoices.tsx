import type {
  DeleteInvoiceMutationVariables,
  FindInvoices,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Invoice/InvoicesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_INVOICE_MUTATION = gql`
  mutation DeleteInvoiceMutation($id: Int!) {
    deleteInvoice(id: $id) {
      id
    }
  }
`

const InvoicesList = ({ invoices }: FindInvoices) => {
  const [deleteInvoice] = useMutation(DELETE_INVOICE_MUTATION, {
    onCompleted: () => {
      toast.success('Invoice deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteInvoiceMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete invoice ' + id + '?')) {
      deleteInvoice({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Amount</th>
            <th>Due date</th>
            <th>Payer email</th>
            <th>Payer phone</th>
            <th>Currency</th>
            <th>Late fee</th>
            <th>Description</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{truncate(invoice.id)}</td>
              <td>{truncate(invoice.amount)}</td>
              <td>{timeTag(invoice.dueDate)}</td>
              <td>{truncate(invoice.payerEmail)}</td>
              <td>{truncate(invoice.payerPhone)}</td>
              <td>{truncate(invoice.currency)}</td>
              <td>{truncate(invoice.lateFee)}</td>
              <td>{truncate(invoice.description)}</td>
              <td>{timeTag(invoice.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.invoice({ id: invoice.id })}
                    title={'Show invoice ' + invoice.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editInvoice({ id: invoice.id })}
                    title={'Edit invoice ' + invoice.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete invoice ' + invoice.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(invoice.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InvoicesList
