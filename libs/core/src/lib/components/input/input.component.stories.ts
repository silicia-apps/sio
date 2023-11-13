import type { Meta, StoryObj } from '@storybook/angular';
import { SioCoreInputComponent } from './input.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SioCoreInputComponent> = {
  component: SioCoreInputComponent,
  title: 'SioCoreInputComponent',
};
export default meta;
type Story = StoryObj<SioCoreInputComponent>;

export const Primary: Story = {
  args: {
    label: '',
    name: '',
    position: 'floating',
    autocapitalize: 'off',
    autocomplete: 'off',
    autocorrect: 'off',
    autofocus: false,
    clearInput: false,
    clearOnEdit: undefined,
    color: undefined,
    debounce: 0,
    disabled: false,
    lines: 'full',
    type: 'text',
  },
};

export const Heading: Story = {
  args: {
    label: '',
    name: '',
    position: 'floating',
    autocapitalize: 'off',
    autocomplete: 'off',
    autocorrect: 'off',
    autofocus: false,
    clearInput: false,
    clearOnEdit: undefined,
    color: undefined,
    debounce: 0,
    disabled: false,
    lines: 'full',
    type: 'text',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/input works!/gi)).toBeTruthy();
  },
};
