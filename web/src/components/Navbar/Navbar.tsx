// web/src/components/Navbar/Navbar.js

import { Link, routes } from '@redwoodjs/router'

// Import your Logo component (if you have one)
import './Navbar.css'
// import Wallet from 'src/components/Wallet'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* <Logo /> Replace with your logo component */}
        <Link to={routes.home()}>
          <img src="./WhiteLogo.png" style={{maxWidth: '60px', maxHeight: '60px'}}></img>
        </Link>
      </div>
      <div className="navbar-right">
        <ul>
          <li>
            <Link to={routes.invoices()}>Invoices</Link>
          </li>
          <li>
            <Link to={routes.reports()}>Reports</Link>
          </li>
          <li>
            <Link to={routes.dashboard()}>Dashboard</Link>
          </li>
          <li>
            <Link to={routes.profile()}></Link>
          </li>
          {/* <li>
            <Wallet />
          </li> */}

          {/* Add more navigation links as needed */}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
