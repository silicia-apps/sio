import type { Meta, StoryObj } from '@storybook/angular';
import { SioCoreIconComponent } from './icon.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SioCoreIconComponent> = {
  component: SioCoreIconComponent,
  title: 'SioCoreIconComponent',
};
export default meta;
type Story = StoryObj<SioCoreIconComponent>;

export const Primary: Story = {
  args: {
    name: undefined,
    url: undefined,
    size: undefined,
    only: false,
  },
};

export const Heading: Story = {
  args: {
    name: undefined,
    url: undefined,
    size: undefined,
    only: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/icon works!/gi)).toBeTruthy();
  },
};
