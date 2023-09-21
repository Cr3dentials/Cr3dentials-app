import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const TransactionsPage = () => {
  return (
    <>
      <MetaTags title="Transactions" description="Transactions page" />

      <h1>TransactionsPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/TransactionsPage/TransactionsPage.tsx</code>
      </p>
      <p>
        My default route is named <code>transactions</code>, link to me with `
        <Link to={routes.transactions()}>Transactions</Link>`
      </p>
    </>
  )
}

export default TransactionsPage
