import type { Meta, StoryObj } from '@storybook/react'

import InvoicesPage from './InvoicesPage'

const meta: Meta<typeof InvoicesPage> = {
  component: InvoicesPage,
}

export default meta

type Story = StoryObj<typeof InvoicesPage>

export const Primary: Story = {}
