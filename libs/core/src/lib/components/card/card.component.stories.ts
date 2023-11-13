import type { Meta, StoryObj } from '@storybook/angular';
import { SioCoreCardComponent } from './card.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SioCoreCardComponent> = {
  component: SioCoreCardComponent,
  title: 'SioCoreCardComponent',
};
export default meta;
type Story = StoryObj<SioCoreCardComponent>;

export const Primary: Story = {
  args: {
    disabled: false,
    lines: 'none',
    value: '',
    position: 'left',
    toggleIconSlot: 'end',
    toggleIcon: 'chevron-down-outline',
    shape: 'compact',
    title: '',
    subtitle: '',
    img: null,
    altImg: 'Alternative Text for image',
    type: 'standard',
  },
};

export const Heading: Story = {
  args: {
    disabled: false,
    lines: 'none',
    value: '',
    position: 'left',
    toggleIconSlot: 'end',
    toggleIcon: 'chevron-down-outline',
    shape: 'compact',
    title: '',
    subtitle: '',
    img: null,
    altImg: 'Alternative Text for image',
    type: 'standard',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/card works!/gi)).toBeTruthy();
  },
};
