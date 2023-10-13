import type { Meta, StoryObj } from '@storybook/react'

import PayerPage from './PayerPage'

const meta: Meta<typeof PayerPage> = {
  component: PayerPage,
}

export default meta

type Story = StoryObj<typeof PayerPage>

export const Primary: Story = {}
