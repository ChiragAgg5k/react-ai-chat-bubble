import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import ChatBubble, { ChatBubbleProps } from '../components/ChatBubble'

export default {
  title: 'Components/ChatBubble',
  component: ChatBubble,
  argTypes: {
    apiKey: { control: 'text' },
    className: { control: 'text' },
    initialMessage: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<ChatBubbleProps> = (args) => <ChatBubble {...args} />;

export const Default = Template.bind({});
Default.args = {
  apiKey: 'your-api-key-here',
};

export const CustomClass = Template.bind({});
CustomClass.args = {
  ...Default.args,
  className: 'custom-chat-bubble',
};

export const CustomInitialMessage = Template.bind({});
CustomInitialMessage.args = {
  ...Default.args,
  initialMessage: 'Welcome to our custom chat! How can I help you today?',
};

export const NoApiKey = Template.bind({});
NoApiKey.args = {
  apiKey: '',
};
NoApiKey.parameters = {
  docs: {
    description: {
      story: 'This story demonstrates what happens when no API key is provided.',
    },
  },
};