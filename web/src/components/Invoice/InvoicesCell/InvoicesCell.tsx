import type { FindInvoices } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Invoices from 'src/components/Invoice/Invoices'

export const QUERY = gql`
  query FindInvoices {
    invoices {
      id
      amount
      dueDate
      payerEmail
      payerPhone
      currency
      lateFee
      description
      createdAt
      paymentStatus
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No invoices yet. '}
      <Link to={routes.newInvoice()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ invoices }: CellSuccessProps<FindInvoices>) => {
  return <Invoices invoices={invoices} />
}
