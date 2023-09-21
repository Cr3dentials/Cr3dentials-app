import { render } from '@redwoodjs/testing/web'

import ReportsPage from './ReportsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ReportsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ReportsPage />)
    }).not.toThrow()
  })
})
