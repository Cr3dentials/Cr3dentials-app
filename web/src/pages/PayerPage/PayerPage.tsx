import { useQuery } from '@apollo/client'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import PayerCell from 'src/components/PayerCell'

// import PayerCell, {
//   QUERY as FindPayerQuery,
// } from 'src/components/PayerCell/PayerCell'

interface Props {
  id: number
}

const PayerPage = ({ id }: Props) => {
  // Fetch the payer data using useQuery
  // const { data, error, loading } = useQuery(FindPayerQuery, {
  //   variables: {
  //     id: 1, // Adjust the ID to the payer you want to fetch
  //   },
  // })

  // if (loading) {
  //   return <div>Loading...</div>
  // }

  // if (error) {
  //   return <div style={{ color: 'red' }}>Error: {error.message}</div>
  // }
  console.log(id)
  return (
    <>
      <MetaTags title="Payer" description="Payer page" />
      <h1>Payer</h1>
      <PayerCell id={id}/>
    </>
  )
}

export default PayerPage
