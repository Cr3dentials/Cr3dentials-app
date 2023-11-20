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

import PayerTable from './PayerTable'

const meta: Meta<typeof PayerTable> = {
  component: PayerTable,
}

export default meta

type Story = StoryObj<typeof PayerTable>

export const Primary: Story = {}
