import type { Meta, StoryObj } from '@storybook/angular';
import { SioAuthProfilePageComponent } from './profile.page';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SioAuthProfilePageComponent> = {
  component: SioAuthProfilePageComponent,
  title: 'SioAuthProfilePageComponent',
};
export default meta;
type Story = StoryObj<SioAuthProfilePageComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/profile.page works!/gi)).toBeTruthy();
  },
};
