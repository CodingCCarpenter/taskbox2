

# Notes #
* These are notes taken as I completed an introduction tutorial for Storybook. *

** TUTORIAL URL: ** https://storybook.js.org/tutorials/intro-to-storybook/react/en/get-started/

## Initial Setup ##

- This first project focused on cloning an existing project and installing the pre-installed dependancies. 

Further study would be needed for initial setup.


* commit *


## Setup for Simple Component ##
  Create the task component and the accompanying story file: src/components/Task.js and src/components/ Task.stories.js
 
  Begin with implementation of the Task, taking in attributes we know we'll need and the two actions you can take on a task to move it between lists.

  There are two basic levels of organization in a Storybook: the component and its child stories. Think of each story as a permutation of a component. You can have as many stories per component as you need. 

  - ** Component **
   - Story
   - Story
   - Story

  To tell Storybook about the component we are documenting, we create a default export that contains:
    
    - component -- the component itself
    - title -- how to refer to the component in the sidebar of the Storybook app
    - excludeStories -- exports in the story file that should not be rendered as stories by Storybook
    - argTypes -- specifically the args behavior in each story

  To define our stories, we export a function for each of our test states to generate a story. The story is a function that returns a rendered element (i.e. a component with a set of props) in a given state -- exactly like a Stateless Functional Component. 

  Since we have multiple permutations of our component, it's convenient to assign it to a Template variable. Introducing this pattern in your stories will reduce the amount of code you need to write and maintain. 

  ` Template.bind({}) is a standard JavaScript technique for making a copy of a function. We use this technique to allow each exported story to set its own properties, but use the same implementation.`

  Arguments, or `args` for short, allow us to live edit our components with the controls addon without restarting Storybook. Once an `args` value changes, so does the component.

  When creating a story we use a base `task` arg to build out the shape of the task the component expects. This is typically modelled from what the true data looks like. Again exporting this shape will enable us to reuse it in later stores, as we'll see. 

  `Actions help you verify interactions when building ui components in isolation. Often you won't have access to the functions and state you have in context of the app. Use action() to stub them in.`


  * commit *


`parameters` are typically used to control the behavior of Storybook's features and addons. In our case we're going to use them to configure how the actions (mocked callbacks) are handled. 

`actions` allow us to create callbacks that appear in the actions panel of the Storybook UI when clicked. So when we build a pin button, we'll be able to determine in the test UI if a button click is successful. 

Once we've done this, restarting the Storybook server should yield test cases for the three Task states. 


* commit - at this point I had some minor typos to correct in the config file *


## Build out the states ##
Now that we have Storybook setup, styles imported, and test cases built out, we can quickly start the work of implementing the HTML of the component to match the design.

The component is still basic at the moment. First, write the code that achieves the design without going into too much detail. (See `src/components/Task.js` )


