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

import InvoiceForm from './InvoiceForm'

const meta: Meta<typeof InvoiceForm> = {
  component: InvoiceForm,
}

export default meta

type Story = StoryObj<typeof InvoiceForm>

export const Primary: Story = {}
