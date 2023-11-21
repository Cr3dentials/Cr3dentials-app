import { render } from '@redwoodjs/testing/web'

import InvoiceList from './InvoiceList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('InvoiceList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InvoiceList />)
    }).not.toThrow()
  })
})
