<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';  
//   import OnboardingMainItem from '../../OnboardingMainItem.stories.svelte';
  
    import OnboardingMain from './OnboardingMainItem.svelte';  
   
  </script>
  
  <Meta title="Core/OnboardingMainItem" component={OnboardingMain}/> 
    
  
  <Template let:args>
    <OnboardingMain {...args}>
  
    </OnboardingMain>
  </Template>
  
  <Story name="Main Button" args={{showOnboardingSteps: false}} argTypes={{showOnboardingSteps: {
    type: {
      name: 'boolean'
    }, 
    control:{
      type: 'radio',
      options: [
        'true',
        'false'
      ]
    },   
    description: 'to test description'
  }}} >
    
</Story>
  
  <!-- <Story name="Square" source args={{rounded: false}}/> -->
  
  <!-- Dynamic snippet should be disabled for this story -->
  <!-- <Story name="Button No Args">
    <Button>Label</Button>
  </Story> -->