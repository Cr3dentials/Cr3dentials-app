import type { FindInvoiceById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Invoice from 'src/components/Invoice/Invoice'

export const QUERY = gql`
  query FindInvoiceById($id: Int!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Invoice not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ invoice }: CellSuccessProps<FindInvoiceById>) => {
  return <Invoice invoice={invoice} />
}
