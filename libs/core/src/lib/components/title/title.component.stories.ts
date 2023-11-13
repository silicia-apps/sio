import type { Meta, StoryObj } from '@storybook/angular';
import { SioCoreTitleComponent } from './title.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SioCoreTitleComponent> = {
  component: SioCoreTitleComponent,
  title: 'SioCoreTitleComponent',
};
export default meta;
type Story = StoryObj<SioCoreTitleComponent>;

export const Primary: Story = {
  args: {
    title: '',
  },
};

export const Heading: Story = {
  args: {
    title: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/title works!/gi)).toBeTruthy();
  },
};
