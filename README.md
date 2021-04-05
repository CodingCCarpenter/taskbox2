

# Notes #
* These are notes taken as I completed an introduction tutorial for Storybook. *

** TUTORIAL URL: ** https://storybook.js.org/tutorials/intro-to-storybook/react/en/get-started/

## Initial Setup ##

- This first project focused on cloning an existing project and installing the pre-installed dependancies. 

Further study would be needed for initial setup.


* commit *


# Setup for Simple Component #
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

  `*** Template.bind({}) is a standard JavaScript technique for making a copy of a function. We use this technique to allow each exported story to set its own properties, but use the same implementation.`

  Arguments, or `args` for short, allow us to live edit our components with the controls addon without restarting Storybook. Once an `args` value changes, so does the component.

  When creating a story we use a base `task` arg to build out the shape of the task the component expects. This is typically modelled from what the true data looks like. Again exporting this shape will enable us to reuse it in later stores, as we'll see. 

  `*** Actions help you verify interactions when building ui components in isolation. Often you won't have access to the functions and state you have in context of the app. Use action() to stub them in.`


  * commit *


`parameters` are typically used to control the behavior of Storybook's features and addons. In our case we're going to use them to configure how the actions (mocked callbacks) are handled. 

`actions` allow us to create callbacks that appear in the actions panel of the Storybook UI when clicked. So when we build a pin button, we'll be able to determine in the test UI if a button click is successful. 

Once we've done this, restarting the Storybook server should yield test cases for the three Task states. 


* commit - at this point I had some minor typos to correct in the config file *


## Build out the states ##
Now that we have Storybook setup, styles imported, and test cases built out, we can quickly start the work of implementing the HTML of the component to match the design.

The component is still basic at the moment. First, write the code that achieves the design without going into too much detail. (See `src/components/Task.js` )

## Snapshot Testing ##
Snapshot testing refers to the practice of recording the 'known good' output of a component for a given input and then flagging the component whenever the output changes in the future. This complements Storybook, because it's a quick way to view the new version of a component and check out the changes. 

`*** Make sure your components render data that doesn't change, so that your snapshot tests won't fail each time. Watch out for things like dates or randomly generated values`

When the [Storyshots addon](https://github.com/storybooks/storybook/tree/master/addons/storyshots), a snapshot test is created for each of the stories. Use it by adding the following development dependencies:

`yarn add -D @storybook/addon-storyshots react-test-renderer`

Then create a src/storybook.test.js file with the following in it: 

in src/storybook.test.js:
`import initStoryshots from '@storybook/addon-storyshots';
initStoryshots();`

run `yarn test` to see the new tests. We now have a snapshot test for each of our Task stories. If we change the implementation of `Task`, we'll be prompted to verify the changes.

# Assemble a Composite Component #
### Assemble a composite component out of simpler components ###

Now that we've built our first component, this chapter extends what we learned to build TaskList, a list of Tasks. We will combine components together and see what happens when more complexity is introduced.

## Tasklist ##

Our Taskbox app emphasizes pinned tasks by positioning them above default tasks. This yields two variations of TaskList you need to create stories for: default items and pinned items.

Since the Task data can be sent asynchronously, we also need a loading state to render in the absence of a connection. In addition, an empty state is required when there are no tasks.

## Get Set up to build composite component ##

A composite component isn't much different than the basic components it contains. Create a TaskList component and an accompanying storyfile: `src/components/TaskList.js` and `src/components/TaskList.stories.js`.

Start with a rough implementation of `TaskList`. You'll need to import the `Task` component from earlier and pass in the attributes and actions as inputs. 


* commit *


` *** Decorators are a way to provide arbitrary wrappers to stories. In this case we're using a decorator 'key' on the default export to add some 'padding' around the rendered component. They can also be used to wrap stories in 'providers' -i.e. library components that set React context`

By importing `TaskStories`, we were able to compose the args in our stories with minimal effort. That way the data and actions (mocked callbacks) expected by both components is preserved. 

run `npm storybook` to see the new stories for TaskList in storybook

## Build out the states ##

Our component is still rough but now we have an idea of the stories to work toward. You might be thinking that the .list-items wrapper is overly simplistic. You're right - in most cases we wouldn't create a new component just to add a wrapper. But the real complexity of TaskList component is revealed in the edge cases withPinnedTasks, Loading, and empty


* commit *


# Unit Tests with Jest #

## Automated Testing ## 

In the previous chapter, we learned how to snapshot test stories using Storyshots. With `Task` there wasn't a lot of complexity to test beyond that it renders OK. Since `TaskList` adds another layer of complexity we want to verify that certain inputs produce certain outputs in a way amenable to automatic testing. To do this we'll create unit tests using [Jest](https://facebook.github.io/jest/) coupled with a test renderer.

## Unit Tests with Jest ##
Storybook stories, manual tests, and snapshot tests go a long way to avoiding UI Bugs. If stories cover a wide variety of component use cases, and we use tools that ensure a human checks any change to the story, errors are much less likely. 

However, sometimes the devil is in the details. A test framework that is explicit about those details is needed. Which brings us to unit tests. 

In our case, we want our `TaskList` to render any pinned tasks *before* unpinned tasks that it has passed in the `tasks` prop. Although we have a story (WithPinnedTasks) to test this exact scenario, it can be ambiguous to a human reviewer that if the component *stops* ordering the tasks like this, it is a bug. It certainly won't scream "*wrong!*" to the casual eye. 

So, to avoid this problem, we can use Jest to render the story to the DOM and run some DOM querying code to verify the salient features of the output. THe nice thing about the story format is that we can simply import the story in our tests and render it there!

Create a test file called src/components/TaskList.test.js. Here, we'll build our our tests that make assertions about the output.


* commit *


Note that we've been able to reuse the `WithPinnedTasks` story in our unit test; in this way we can continue to leverage an existing resource (the examples that represent interesting configurations of a component) in many ways. 

Notice as well that this test is quite brittle. It's possible that as the project matures, and the exact implementation of the `Task` changes -- perhaps using a different className or a `testarea` rather than an `input` -- the test will fail and need to be updated. This is not necessarily a problem, but rather an indication to be careful about liberally using unit tests for UI. They're not easy to maintain. INstead, rely on manual, snapshot, and visual regression (see [testing chapter](https://storybook.js.org/tutorials/intro-to-storybook/react/en/test/)) tests where possible
