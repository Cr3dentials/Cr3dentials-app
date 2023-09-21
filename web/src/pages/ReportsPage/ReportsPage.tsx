import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const ReportsPage = () => {
  return (
    <>
      <MetaTags title="Reports" description="Reports page" />

      <h1>ReportsPage</h1>
      <p>
        Find me in <code>./web/src/pages/ReportsPage/ReportsPage.tsx</code>
      </p>
      <p>
        My default route is named <code>reports</code>, link to me with `
        <Link to={routes.reports()}>Reports</Link>`
      </p>
    </>
  )
}

export default ReportsPage
