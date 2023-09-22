// web/src/pages/CreateInvoicePage/CreateInvoicePage.tsx
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import InvoiceForm from 'src/components/InvoiceForm'

const CreateInvoicePage = () => {
  return (
    <>
      <MetaTags title="Create Invoice" />
      <h1>Create Invoice</h1>
      <InvoiceForm />
      <p>
        <Link to={routes.invoices()}>View Invoices</Link>
      </p>
    </>
  )
}

export default CreateInvoicePage
