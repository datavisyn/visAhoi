import Scatterchart from './Scatterchart.svelte';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes
export default {
  title: 'Plotly/Scatterchart',
  component: Scatterchart,
  argTypes: {
    name: { control: 'text' },
  },  
};

// More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args
const Template = (args) => ({
  Component: Scatterchart,
  props: args
});

// More on args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Basic = Template.bind({});
Basic.args = {
  contextKey: 'Button',
};
// Basic.parameters = {
//   componentSource: {
//     code: 'This is sample code',
//     language: 'javascript'
//   }
// }