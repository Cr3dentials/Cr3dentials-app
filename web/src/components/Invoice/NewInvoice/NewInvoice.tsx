import type { CreateInvoiceInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import InvoiceForm from 'src/components/Invoice/InvoiceForm'

const CREATE_INVOICE_MUTATION = gql`
  mutation CreateInvoiceMutation($input: CreateInvoiceInput!) {
    createInvoice(input: $input) {
      id
    }
  }
`

const NewInvoice = () => {
  const [createInvoice, { loading, error }] = useMutation(
    CREATE_INVOICE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Invoice created')
        navigate(routes.invoices())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateInvoiceInput) => {
    createInvoice({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Invoice</h2>
      </header>
      <div className="rw-segment-main">
        <InvoiceForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewInvoice
