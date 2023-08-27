import type { Meta, StoryObj } from '@storybook/react'
import App from './App'
import { ReduxStoreProviderDecorator } from '../stories/ReduxStoreProviderDecorator'


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof App> = {
	title: 'TODOLIST/App',
	component: App,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
	tags: ['autodocs'],
	args: {
		demo: true
	},
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	decorators: [ReduxStoreProviderDecorator]

}

export default meta
type Story = StoryObj<typeof App>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AppWithReduxStory: Story = {
	// More on args: https://storybook.js.org/docs/react/writing-stories/args
}
