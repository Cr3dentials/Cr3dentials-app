import { gql } from '@apollo/client'
import type { FindPayerQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindPayerQuery($id: Int!) {
    payer: invoice(id: $id) {
      id
      amount
      dueDate
      status
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps<FindPayerQuery>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ payer }: CellSuccessProps<FindPayerQuery>) => {
  return (
    <>
      {/* Render the fetched payer */}
      <div>
        <p>Payer ID : {payer.id}</p>
        <p>Amount: {payer.amount}</p>
        <p>Due: {payer.dueDate}</p>
        <p>Status: {payer.status}</p>
      </div>
    </>
  )
}
//export default PayerCell
