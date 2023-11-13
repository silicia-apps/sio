import type { Meta, StoryObj } from '@storybook/angular';
import { SioCoreAppComponent } from './app.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SioCoreAppComponent> = {
  component: SioCoreAppComponent,
  title: 'SioCoreAppComponent',
};
export default meta;
type Story = StoryObj<SioCoreAppComponent>;

export const Primary: Story = {
  args: {
    title: '',
    leftPanelType: undefined,
    rightPanelType: undefined,
    leftPanelMenuID: '',
    rightPanelMenuID: '',
    tabMenuID: '',
    tabDesktopPosition: '',
    tabMobilePosition: '',
  },
  
};

export const Heading: Story = {
  args: {
    title: '',
    leftPanelType: undefined,
    rightPanelType: undefined,
    leftPanelMenuID: '',
    rightPanelMenuID: '',
    tabMenuID: '',
    tabDesktopPosition: '',
    tabMobilePosition: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/app works!/gi)).toBeTruthy();
  },
};
