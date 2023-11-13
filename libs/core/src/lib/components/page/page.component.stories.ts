import type { Meta, StoryObj } from '@storybook/angular';
import { SioCorePageComponent } from './page.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SioCorePageComponent> = {
  component: SioCorePageComponent,
  title: 'SioCorePageComponent',
};
export default meta;
type Story = StoryObj<SioCorePageComponent>;

export const Primary: Story = {
  args: {
    title: '',
    toolbar: '',
    menu: '',
    back: '',
    search: '',
    fullmode: '',
  },
};

export const Heading: Story = {
  args: {
    title: '',
    toolbar: '',
    menu: '',
    back: '',
    search: '',
    fullmode: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/page works!/gi)).toBeTruthy();
  },
};
