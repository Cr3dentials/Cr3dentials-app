import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import InvoiceList from 'src/components/InvoiceList/InvoiceList' // Import the InvoiceList component

const DashboardPage = () => {
  return (
    <>
      <MetaTags title="Dashboard" description="Dashboard page" />
      <h1>DashboardPage</h1>
      <Link to={routes.dashboard()}>Dashboard</Link>`
      {/* Add the InvoiceList component here */}
      <InvoiceList />
    </>
  )
}

export default DashboardPage
