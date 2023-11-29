import { Set, Router, Route } from '@redwoodjs/router'

import MainLayout from 'src/layouts/MainLayout'
import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import CreateInvoicePage from './pages/CreateInvoicePage/CreateInvoicePage'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import HomePage from './pages/HomePage/HomePage'
import PayerPage from './pages/PayerPage/PayerPage'
import PostNewPostPage from './pages/Post/NewPostPage/NewPostPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import ReportsPage from './pages/ReportsPage/ReportsPage'

const Routes = () => {
  return (
    <Router>
      <Set wrap={MainLayout}>
        <Route path="/payer" page={PayerPage} name="payerWithoutId" />
        <Route path="/payer/{id:Int}" page={PayerPage} name="payer" />
        <Route path="/create-invoice" page={CreateInvoicePage} name="createInvoice" />

        <Set wrap={ScaffoldLayout} title="Invoices" titleTo="invoices" buttonLabel="New Invoice" buttonTo="newInvoice">
          <Route path="/invoices/new" page={InvoiceNewInvoicePage} name="newInvoice" />
          <Route path="/invoices/{id:Int}/edit" page={InvoiceEditInvoicePage} name="editInvoice" />
          <Route path="/invoices/{id:Int}" page={InvoiceInvoicePage} name="invoice" />
          <Route path="/invoices" page={InvoiceInvoicesPage} name="invoices" />
        </Set>

        <Route path="/profile" page={ProfilePage} name="profile" />
        <Route path="/" page={HomePage} name="home" />
        <Route path="/dashboard" page={DashboardPage} name="dashboard" />
        <Route path="/reports" page={ReportsPage} name="reports" />

        {/* <Set wrap={ScaffoldLayout} title="Posts" titleTo="posts" buttonLabel="New Post" buttonTo="newPost">
          <Route path="/posts/new" page={PostNewPostPage} name="newPost" />
          <Route path="/posts/{id:Int}/edit" page={PostEditPostPage} name="editPost" />
          <Route path="/posts/{id:Int}" page={PostPostPage} name="post" />
          <Route path="/posts" page={PostPostsPage} name="posts" />
        </Set> */}

        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
