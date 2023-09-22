import { render } from '@redwoodjs/testing/web'

import Wallet from './Wallet'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Wallet', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Wallet />)
    }).not.toThrow()
  })
})
