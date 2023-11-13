import type { Meta, StoryObj } from '@storybook/angular';
import { SioCoreMenuItemComponent } from './menu-item.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SioCoreMenuItemComponent> = {
  component: SioCoreMenuItemComponent,
  title: 'SioCoreMenuItemComponent',
};
export default meta;
type Story = StoryObj<SioCoreMenuItemComponent>;

export const Primary: Story = {
  args: {
    caption: undefined,
    style: 'rounded',
    lines: 'none',
    icon: undefined,
    url: undefined,
    layout: undefined,
    type: 'navigate',
    badge: undefined,
    tabbed: false,
  },
};

export const Heading: Story = {
  args: {
    caption: undefined,
    style: 'rounded',
    lines: 'none',
    icon: undefined,
    url: undefined,
    layout: undefined,
    type: 'navigate',
    badge: undefined,
    tabbed: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/menu-item works!/gi)).toBeTruthy();
  },
};
