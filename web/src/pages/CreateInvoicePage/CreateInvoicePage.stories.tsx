import type { Meta, StoryObj } from '@storybook/react'

import CreateInvoicePage from './CreateInvoicePage'

const meta: Meta<typeof CreateInvoicePage> = {
  component: CreateInvoicePage,
}

export default meta

type Story = StoryObj<typeof CreateInvoicePage>

export const Primary: Story = {}
