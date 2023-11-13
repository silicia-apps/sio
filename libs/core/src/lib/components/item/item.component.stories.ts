import type { Meta, StoryObj } from '@storybook/angular';
import { SioCoreItemComponent } from './item.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SioCoreItemComponent> = {
  component: SioCoreItemComponent,
  title: 'SioCoreItemComponent',
};
export default meta;
type Story = StoryObj<SioCoreItemComponent>;

export const Primary: Story = {
  args: {
    label: '',
    image: '',
    alt: undefined,
  },
};

export const Heading: Story = {
  args: {
    label: '',
    image: '',
    alt: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/item works!/gi)).toBeTruthy();
  },
};
