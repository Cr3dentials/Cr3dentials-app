// web/src/components/Navbar/Navbar.js

import { Link, routes } from '@redwoodjs/router'
// Import your Logo component (if you have one)
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* <Logo /> Replace with your logo component */}
        <Link to="/">
          <h1>Cr3dentials</h1>
        </Link>
      </div>
      <div className="navbar-right">
        <ul>
          <li>
            <Link to={routes.transactions()}>Transactions</Link>
          </li>
          <li>
            <Link to={routes.reports()}>Reports</Link>
          </li>
          <li>
            <Link to={routes.dashboard()}>Dashboard</Link>
          </li>
          <li>
            <Link to={routes.profile()}>Profile</Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
