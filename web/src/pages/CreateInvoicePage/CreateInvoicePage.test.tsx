import { render } from '@redwoodjs/testing/web'

import CreateInvoicePage from './CreateInvoicePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CreateInvoicePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateInvoicePage />)
    }).not.toThrow()
  })
})
