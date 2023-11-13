import type { Meta, StoryObj } from '@storybook/angular';
import { SioCoreListComponent } from './list.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SioCoreListComponent> = {
  component: SioCoreListComponent,
  title: 'SioCoreListComponent',
};
export default meta;
type Story = StoryObj<SioCoreListComponent>;

export const Primary: Story = {
  args: {
    id: 'main',
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
    id: 'main',
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
    expect(canvas.getByText(/list works!/gi)).toBeTruthy();
  },
};
