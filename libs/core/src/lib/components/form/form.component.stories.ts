import type { Meta, StoryObj } from '@storybook/angular';
import { SioCoreFormComponent } from './form.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SioCoreFormComponent> = {
  component: SioCoreFormComponent,
  title: 'SioCoreFormComponent',
};
export default meta;
type Story = StoryObj<SioCoreFormComponent>;

export const Primary: Story = {
  args: {
    cancel: false,
    color: 'dark',
  },
};

export const Heading: Story = {
  args: {
    cancel: false,
    color: 'dark',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/form works!/gi)).toBeTruthy();
  },
};
