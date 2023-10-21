// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import Web3auth from './Web3auth'

const meta: Meta<typeof Web3auth> = {
  component: Web3auth,
}

export default meta

type Story = StoryObj<typeof Web3auth>

export const Primary: Story = {}
