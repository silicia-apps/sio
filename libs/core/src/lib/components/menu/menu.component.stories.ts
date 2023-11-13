import type { Meta, StoryObj } from '@storybook/angular';
import { SioCoreMenuComponent } from './menu.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SioCoreMenuComponent> = {
  component: SioCoreMenuComponent,
  title: 'SioCoreMenuComponent',
};
export default meta;
type Story = StoryObj<SioCoreMenuComponent>;

export const Primary: Story = {
  args: {
    menuID: 'main',
    lines: 'none',
    position: 'side',
    toggleIconSlot: 'end',
    toggleIcon: 'chevron-up-outline',
    shape: 'compact',
    style: 'default',
    desktop: false,
  },
};

export const Heading: Story = {
  args: {
    menuID: 'main',
    lines: 'none',
    position: 'side',
    toggleIconSlot: 'end',
    toggleIcon: 'chevron-up-outline',
    shape: 'compact',
    style: 'default',
    desktop: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/menu works!/gi)).toBeTruthy();
  },
};
