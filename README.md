
# SvelteKit-Vitest-Tutorial

## Prerequisites

You need to have NodeJS installed. This is what you will use to download dependencies and create your project.

## Creating your SvelteKit application

To create your SvelteKit project, you will need to execute npm commands. Note that the 'npm create' command will ask you many questions: for the purpose of this tutorial, I have answered that I only wanted Vanilla JS in my project, and that I wanted Vitest configured.

The commands you have to execute:
```bash
npm create svelte@latest <nameProject>
cd <nameProject>
npm install
```
Where <nameProject> is the name of your project. This will create your project and download the necessary dependencies.

## Migrating to SvelteKit

To migrate your Svelte project to Svelte Kit, your original 'App.svelte' file becomes the +page.svelte file directly under the routes folder. Then, you can put any components that you have under the lib folder.

## Add Dependencies

There are two dependencies that need to be added: the testing library for svelte (@testing-library/svelte) and jsdom.
```bash
npm install -D vitest jsdom @testing-library/svelte
```

## Changing the Vitest Configuration

After this is done, you will need to change the Vitest configuration. Otherwise, your Svelte components will not be able to render when you will be executing your automated tests.

This can be done in the vite.config.js file, found directly under the project directory. You need to change the value of the JSON 'test' object so that it becomes:
```json
test: {
		environment: 'jsdom',
		include: ['test/**/*.{test,spec}.{js,ts}']
	}
```

This will configure Vitest to look for tests in the test/ folder, and use 'jsdom' (a simulated browser environment) to render your components.

## Creating the Vitest Tests

To create the tests, you will need the 'it' and 'expect' functions from Vitest, and the 'render' function from the Svelte testing library. The 'it' function allows you to name your test and define its contents. The 'expect' function allows you to make assertions for your tests, confirming the desired behavior. Finally, the 'render' function allows you to render the component for your tests, allowing you to query its structure to determine its contents. See my test files under test/lib/.

## Running the Vitest Tests

Because of the Vitest configuration that was set up earlier, you only need to execute one command to run all of your tests. It needs to be run exactly from the project directory (the folder where vite.config.js is located). Here it is:
```bash
npx vitest run
```

In this project, I have made 8 tests under the test/lib/ folder. When running the above command, there should be 8 tests that finish in success: 6 from InfoBubble.test.js, and 2 from Modal.test.js.
