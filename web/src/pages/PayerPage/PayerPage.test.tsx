import { render } from '@redwoodjs/testing/web'

import PayerPage from './PayerPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PayerPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PayerPage />)
    }).not.toThrow()
  })
})
