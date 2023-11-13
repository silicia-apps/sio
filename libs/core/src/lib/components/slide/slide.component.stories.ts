import type { Meta, StoryObj } from '@storybook/angular';
import { SioCoreSlideComponent } from './slide.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SioCoreSlideComponent> = {
  component: SioCoreSlideComponent,
  title: 'SioCoreSlideComponent',
};
export default meta;
type Story = StoryObj<SioCoreSlideComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/slide works!/gi)).toBeTruthy();
  },
};
