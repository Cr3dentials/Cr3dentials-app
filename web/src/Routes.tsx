import { Router, Route } from '@redwoodjs/router'

import CreateInvoicePage from './pages/CreateInvoicePage/CreateInvoicePage'
import HomePage from './pages/HomePage/HomePage'
import PayerPage from './pages/PayerPage/PayerPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'

const Routes = () => {
  return (
    <Router>
      <Route path="/payer" page={PayerPage} name="payerWithoutId" />
      <Route path="/payer/{id:Int}" page={PayerPage} name="payer" />
      <Route path="/create-invoice" page={CreateInvoicePage} name="createInvoice" />
      <Route path="/invoices/new" page={InvoiceNewInvoicePage} name="newInvoice" />
      <Route path="/invoices/{id:Int}/edit" page={InvoiceEditInvoicePage} name="editInvoice" />
      <Route path="/invoices/{id:Int}" page={InvoiceInvoicePage} name="invoice" />
      <Route path="/invoices" page={InvoiceInvoicesPage} name="invoices" />
      <Route path="/profile" page={ProfilePage} name="profile" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
