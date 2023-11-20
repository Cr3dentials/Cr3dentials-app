import { Link, routes, navigate } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import InvoiceForm from 'src/components/InvoiceForm'

const CreateInvoicePage = () => {
  const onSave = (id) => {
    navigate(routes.payer({ id }))
  }

  return (
    <>
      <MetaTags title="Create Invoice" />
      <h1>Create Invoice</h1>
      <InvoiceForm onSave={onSave} />
      <p>
        <Link to={routes.invoices()}>View Invoices</Link>
      </p>
    </>
  )
}

export default CreateInvoicePage
