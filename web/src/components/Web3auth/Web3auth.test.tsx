import { render } from '@redwoodjs/testing/web'

import Web3auth from './Web3auth'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Web3auth', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Web3auth />)
    }).not.toThrow()
  })
})
