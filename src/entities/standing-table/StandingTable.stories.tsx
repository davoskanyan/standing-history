import type { Meta, StoryObj } from '@storybook/nextjs-vite';
 
import { StandingTable } from './StandingTable';
 
const meta = {
  component: StandingTable,
} satisfies Meta<typeof StandingTable>;
 
export default meta;
type Story = StoryObj<typeof meta>;
 
export const Primary: Story = {
  args: {
    primary: true,
    label: 'StandingTable',
  },
};