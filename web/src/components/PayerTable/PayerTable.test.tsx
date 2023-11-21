import { render } from '@redwoodjs/testing/web'

import PayerTable from './PayerTable'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PayerTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PayerTable />)
    }).not.toThrow()
  })
})
