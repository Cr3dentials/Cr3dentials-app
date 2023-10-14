import { useQuery } from '@apollo/client'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import PayerCell, {
  QUERY as FindPayerQuery,
} from 'src/components/PayerCell/PayerCell'


const PayerPage = () => {
  // Fetch the payer data using useQuery
  const { data, error, loading } = useQuery(FindPayerQuery, {
    variables: {
      id: 1, // Adjust the ID to the payer you want to fetch
    },
  })

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error.message}</div>
  }

  return (
    <>
      <MetaTags title="Payer" description="Payer page" />
      <h1>Payer</h1>
      <p>
        My default route is named <code>payer</code>, link to me with `
        <Link to={routes.payer()}>Payer</Link>`
      </p>
      {data.payer ? (
        <PayerCell payer={data.payer} /> // Pass the payer object to the PayerCell
      ) : (
        <div>No payer found.</div>
      )}
    </>
  )
}

export default PayerPage