import type { Meta, StoryObj } from '@storybook/angular';
import { SioCoreDarkModeToggleComponent } from './darkmode-toggle.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SioCoreDarkModeToggleComponent> = {
  component: SioCoreDarkModeToggleComponent,
  title: 'SioCoreDarkModeToggleComponent',
};
export default meta;
type Story = StoryObj<SioCoreDarkModeToggleComponent>;

export const Primary: Story = {
  args: {
    caption: 'L_DARKMODE',
    style: undefined,
    icon: 'sunny',
  },
};

export const Heading: Story = {
  args: {
    caption: 'L_DARKMODE',
    style: undefined,
    icon: 'sunny',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/dark-mode-toggle works!/gi)).toBeTruthy();
  },
};
