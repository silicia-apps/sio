import type { Meta, StoryObj } from '@storybook/angular';
import { SioCoreModalComponent } from './modal.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SioCoreModalComponent> = {
  component: SioCoreModalComponent,
  title: 'SioCoreModalComponent',
};
export default meta;
type Story = StoryObj<SioCoreModalComponent>;

export const Primary: Story = {
  args: {
    id: 'main',
  },
};

export const Heading: Story = {
  args: {
    id: 'main',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/modal works!/gi)).toBeTruthy();
  },
};
