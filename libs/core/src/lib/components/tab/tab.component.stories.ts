import type { Meta, StoryObj } from '@storybook/angular';
import { SioCoreTabComponent } from './tab.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SioCoreTabComponent> = {
  component: SioCoreTabComponent,
  title: 'SioCoreTabComponent',
};
export default meta;
type Story = StoryObj<SioCoreTabComponent>;

export const Primary: Story = {
  args: {
    tabID: '',
    style: 'default',
  },
};

export const Heading: Story = {
  args: {
    tabID: '',
    style: 'default',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/tab works!/gi)).toBeTruthy();
  },
};
