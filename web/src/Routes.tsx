// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import MainLayout from 'src/layouts/MainLayout'
import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import HomePage from './pages/HomePage/HomePage'
import ProfilePage from './pages/ProfilePage/ProfilePage'

const Routes = () => {
  return (
    <Router>
      <Set wrap={MainLayout}>
        <Route path="/create-invoice" page={CreateInvoicePage} name="createInvoice" />

        <Set wrap={ScaffoldLayout} title="Invoices" titleTo="invoices" buttonLabel="New Invoice" buttonTo="newInvoice">
          <Route path="/invoices/new" page={InvoiceNewInvoicePage} name="newInvoice" />
          <Route path="/invoices/{id:Int}/edit" page={InvoiceEditInvoicePage} name="editInvoice" />
          <Route path="/invoices/{id:Int}" page={InvoiceInvoicePage} name="invoice" />
          <Route path="/invoices" page={InvoiceInvoicesPage} name="invoices" />
        </Set>

        {/* <Route path="/invoices" page={InvoicesPage} name="invoices" /> */}
        <Route path="/profile" page={ProfilePage} name="profile" />
        <Route path="/" page={HomePage} name="home" />
        <Route path="/dashboard" page={DashboardPage} name="dashboard" />
        <Route path="/reports" page={ReportsPage} name="reports" />
        <Set wrap={ScaffoldLayout} title="Posts" titleTo="posts" buttonLabel="New Post" buttonTo="newPost">
          <Route path="/posts/new" page={PostNewPostPage} name="newPost" />
          <Route path="/posts/{id:Int}/edit" page={PostEditPostPage} name="editPost" />
          <Route path="/posts/{id:Int}" page={PostPostPage} name="post" />
          <Route path="/posts" page={PostPostsPage} name="posts" />
        </Set>
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
