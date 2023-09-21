import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>Empowering Trust in Credit Worldwide</h1>
      <p>
        Empowering individuals and businesses with a reliable credit reputation
        system, accessible to all corners of the globe.
      </p>
      <p>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`
      </p>
    </>
  )
}

HomePage.layout = 'MainLayout' // Specify the layout to use (MainLayout with Navbar)

export default HomePage
