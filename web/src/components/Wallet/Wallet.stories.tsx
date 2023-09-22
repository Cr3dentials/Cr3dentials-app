// Pass props to your component by passing an `args` object to your story
//
// ```jsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import Wallet from './Wallet'

const meta: Meta<typeof Wallet> = {
  component: Wallet,
}

export default meta

type Story = StoryObj<typeof Wallet>

export const Primary: Story = {}
