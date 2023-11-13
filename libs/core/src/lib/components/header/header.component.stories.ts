import type { Meta, StoryObj } from '@storybook/angular';
import { SioCoreHeaderComponent } from './header.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SioCoreHeaderComponent> = {
  component: SioCoreHeaderComponent,
  title: 'SioCoreHeaderComponent',
};
export default meta;
type Story = StoryObj<SioCoreHeaderComponent>;

export const Primary: Story = {
  args: {
    title: '',
  },
};

export const Heading: Story = {
  args: {
    title: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/header works!/gi)).toBeTruthy();
  },
};
