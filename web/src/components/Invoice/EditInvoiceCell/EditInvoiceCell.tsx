import type { EditInvoiceById, UpdateInvoiceInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import InvoiceForm from 'src/components/Invoice/InvoiceForm'

export const QUERY = gql`
  query EditInvoiceById($id: Int!) {
    invoice: invoice(id: $id) {
      id
      amount
      dueDate
      payerEmail
      payerPhone
      currency
      lateFee
      description
      createdAt
    }
  }
`
const UPDATE_INVOICE_MUTATION = gql`
  mutation UpdateInvoiceMutation($id: Int!, $input: UpdateInvoiceInput!) {
    updateInvoice(id: $id, input: $input) {
      id
      amount
      dueDate
      payerEmail
      payerPhone
      currency
      lateFee
      description
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ invoice }: CellSuccessProps<EditInvoiceById>) => {
  const [updateInvoice, { loading, error }] = useMutation(
    UPDATE_INVOICE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Invoice updated')
        navigate(routes.invoices())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateInvoiceInput,
    id: EditInvoiceById['invoice']['id']
  ) => {
    updateInvoice({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Invoice {invoice?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <InvoiceForm
          invoice={invoice}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
