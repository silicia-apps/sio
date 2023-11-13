import type { Meta, StoryObj } from '@storybook/angular';
import { SioCoreLanguageSelectorComponent } from './language-selector.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SioCoreLanguageSelectorComponent> = {
  component: SioCoreLanguageSelectorComponent,
  title: 'SioCoreLanguageSelectorComponent',
};
export default meta;
type Story = StoryObj<SioCoreLanguageSelectorComponent>;

export const Primary: Story = {
  args: {
    caption: 'L_LANGUAGE',
    style: undefined,
    icon: 'sunny',
  },
};

export const Heading: Story = {
  args: {
    caption: 'L_LANGUAGE',
    style: undefined,
    icon: 'sunny',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/language-selector works!/gi)).toBeTruthy();
  },
};
