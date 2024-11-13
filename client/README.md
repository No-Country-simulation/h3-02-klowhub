# ⚡Next professional boilerplate </br> [![GitHub Actions Workflow Status][status-workflow-badge]][status-workflow-badge-link] ![GitHub commit activity (branch)][commit-activity-badge] ![GitHub Created At][created-at-badge] [![MarcossIC][made-by-badge]][made-by-badge-link]

Welcome to nextjs professional boilerplate, an open source template for nextjs. It is prepared with functionalities that will help you make quality code, and will facilitate the maintainability of the code. You can find versions with different functionalities among the branches. I hope you like it

## ✨ Features

You can find these things in the template:

<ul>

<li>
<a style="text-decoration: none;"  href="https://nextjs.org/" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/nextdotjs/01000f" alt="Nextjs" width=17 height=17> <b>Next.js</b>
  </a> - Pre-configured, with default src and app router + Bundler analyzer
</li>

<li style="padding-top: 4px;">
<a style="text-decoration: none;" href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" alt="Tailwind css" width=17 height=17> <b>TailwindCSS</b>
  </a> - By default, CSS Framework for rapid UI development
</li>

<li style="padding-top: 4px;">
<a style="text-decoration: none;" href="https://cva.style/docs" target="_blank" rel="noopener noreferrer"> 
<img src="./.github/assets/cva.svg" alt="CVA" width=17 height=17> <b>CVA</b>
  </a> - To easily manage component variants
</li>

<li style="padding-top: 4px;">
  <a style="text-decoration: none;" href="https://eslint.org/" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/eslint/4B32C3" alt="Eslint"  width=17 height=17> <b>Eslint</b>
  </a> - For cleaner code, find errors faster
</li>

<li style="padding-top: 4px;">
<a style="text-decoration: none;" href="https://prettier.io/" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/prettier/F7B93E" alt="Prettier"  width=17 height=17> <b>Prettier</b>
  </a> - To keep the code formatted
</li>

<li style="padding-top: 4px;">
<a style="text-decoration: none;" href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/typescript/3178C6" alt="Typescript" width=17 height=17> <b>Typescript</b>
  </a> - By default, configured with strict types and with ts-reset for types safety
</li>

<li style="padding-top: 4px;">
<a style="text-decoration: none;" href="https://jestjs.io/" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/jest/C21325" alt="Jest" width=17 height=17>  <b>Jest</b>
  </a> and <a style="text-decoration: none;" href="https://testing-library.com/react" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/testinglibrary/E33332" alt="Testing Library"  width=17 height=17> <b>Testing Library</b>
  </a> - For unit tests and integration tests
</li>

<li style="padding-top: 4px;">
<a style="text-decoration: none;" href="https://storybook.js.org/docs" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/storybook/FF4785" alt="Storybook" width=17 height=17>  <b>Storybook</b>
  </a> - To create tests and use cases for your components 
</li>

<li style="padding-top: 4px;">
<a style="text-decoration: none;" href="https://github.com/typicode/husky#readme" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/precommit/FAB040" alt="Pre commit" width=17 height=17> <b>Husky</b>
  </a> - Configured to raise, git hooks for the pre commit, pre push and commit message
</li>

<li style="padding-top: 4px;">
<a style="text-decoration: none;" href="https://commitlint.js.org/" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/commitlint/000000" alt="Commitlint" width=17 height=17> <b>Commitlint</b>
  </a> with <a style="text-decoration: none;" href="https://www.conventionalcommits.org/en/v1.0.0/" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/conventionalcommits/FE5196" alt="Pre commit" width=17 height=17> <b>Conventional commit</b></a> - To maintain a clean and solid commit history
</li>

<li style="padding-top: 4px;">
<a style="text-decoration: none;" href="https://github.com/features/actions" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/githubactions/2088FF" alt="Github Action" width=17 height=17> <b>Github Actions</b>
  </a> - Pre-configured actions for smooth workflows
</li>

<li style="padding-top: 4px;">
<a style="text-decoration: none;" href="https://zod.dev/" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/zod/3E67B1" alt="Zod" width=17 height=17> <b>Zod</b>
  </a> - For type validation
</li>

<li style="padding-top: 4px;">
<a style="text-decoration: none;" href="https://zustand.docs.pmnd.rs/getting-started/introduction" target="_blank" rel="noopener noreferrer"> <img src="./.github/assets/zustand.png" alt="Zustand" width=17 height=17> <b>Zustand</b>
  </a> - To handle global states simply and cleanly
</li>

<li style="padding-top: 4px;">
<a style="text-decoration: none;" href="https://env.t3.gg" target="_blank" rel="noopener noreferrer"> <img src="https://cdn.simpleicons.org/dotenv/ECD53F" alt="Zustand" width=17 height=17> <b>T3 Env</b>
  </a> - Manage your environment variables
</li>
</ul>

## 🎯 Getting Started

To start using this template, follow the following steps:

1. Fork & clone repository:

```bash
git clone https://github.com/<your_username>/<repo_name>.git
```

2. Install the dependencies:
   In this case you can use the package manager you want. I personally recommend `pnpm`

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open `http://localhost:3000` with your browser to see the result.

5. The project uses husky and patch-package to automate git hooks and validate dependencies. This is executed, with the "postinstall" every time you do install:

```bash
npx patch-package && node setup-husky.js
```

If you do not want to run husky on every installation, remove this `&& node setup-husky.js` from the `postinstall` in the `package.json`

## 📐 Scripts Overview

The template has the following scripts available in the `package.json`:

- `dev`: Starts the development server
- `build`: Builds the app for production
- `analyze`: Analyzes the bundle sizes for Client, Server and Edge environments
- `start`: Starts the production server
- `lint`: Lints the code using ESLint
- `lint:fix`: Automatically fixes linting errors
- `types:check`: Verify typescript types with format message
- `clean`: Remove all files in .next, out and coverage folders
- `commitlint:last`: Check if the last commit follows the commitlint rules
- `format`: Checks the code for proper formatting
- `format:fix`: Automatically fixes formatting issues
- `prepare`: Run husky setup script
- `test`: Runs unit and integration tests
- `test:watch`: Runs unit and integration tests in watch mode
- `test:storybook`: Runs acceptans test with storybook
- `storybook`: Start storybook dev server
- `storybook:serve`: Up a silent storybook development server
- `prebuild:storybook`: Pre-build jest test for storybook
- `build:storybook`: Build storybook server for deployment
- `postinstall`: Applies patches to external dependencies and run prepare script

## :file_folder: Project structure

```shell
/
├── __test__/                 # In this folder all the tests
│   ├── app/                  # The structure is a mirror of src
│   ├── components/
│   ├── lib/
│   ├── styles/
│   └── types/
├── .github/                  # GitHub folder
├── .husky/                   # Husky Hooks
├── .storybook/               # Storybook folder
├── public/                   # Public assets folder
├── src/
│   ├── app/                  # Next JS App (App Router)
│   ├── components/           # React components
│   ├── lib/                  # 3rd party libraries configuration
│   ├── styles/               # Styles folder
│   └── types/                # Types, Enums, Models, schemas
├── .editorconfig             # Editor config
├── .eslintignore             # Patterns eslint should ignore
├── .eslintrc.cjs             # Eslint config
├── .jest-test-results.json   # Jest result output
├── .lintstagedrc.cjs         # Lintstaged config
├── .prettierignore           # Patterns prettier should ignore
├── commitlint.config.cjs     # Commit lint config and commit examples
├── env.js                    # Environment variables config by t3-env
├── jest.config.cjs           # Jest config
├── jest.setup.js             # Jest testing library setup
├── next.config.js            # Next config file
├── postcss.config.cjs        # Postcss config file
├── prettier.config.cjs       # Prettier config
├── README.md                 # README file
├── report-bundle-size.js     # Script to analyze bundle size
├── setup-husky.js            # Script to raise husky on start githooks
├── tailwind.config.cjs       # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## :spades: Package manager

The template does not force you to use a specific package manager so you can choose the one you want. This is why no lock file was uploaded.

However, if you are sure of the package manager you are going to use for the project. You can upload the lock file. And change the `npx` commands to the one you are using.

### :heavy_exclamation_mark: Considerations

In case you choose to use `yarn` as a package manager you should add some things:

- Add this dependency:

```bash
yarn add postinstall-postinstall --save-dev
```

- Update post install:
  You need to find the postinstall script and add the `-y` flag to it

```json
"postinstall": "npx patch-package -y && node setup-husky.js"
```

If you have already decided on the package manager you use, you can consider adding this line to the end of your `package.json`:

```json
"packageManager": "<manager>@<version>"
```

Example:

You only need one, but I leave you examples for these 3 handlers:

```json
"packageManager": "pnpm@9.7.0"
"packageManager": "yarn@1.22.22"
"packageManager": "npm@10.8.2"
```

## :shipit: Testing

To handle the unit and integration tests, jest and testing library are being used. Playwright is used for the e2e tests

### Runing test

Example with pnpm:

- **Unit and integration tests**: Run Jest tests using `pnpm test`
- **Acceptance Tests**: Run storybook test using `pnpm test:storybook`

### StoryBook

Storybook is a development tool that allows you to build and document user interface (UI) components in isolation. It is a kind of **sandbox** where you can develop and view your components independently of the rest of the application. This makes it easier to design, test, and document reusable components, allowing development and design teams to work more efficiently and collaboratively.

Storybook is not only useful for building and visualizing components, but also offers tools for automated testing, improving code quality and reliability. You can write your acceptance tests using storybook's [play][storybook-play-link] function.
To run the storybook tests you may need to have [playwright installed][playwright-install-link] with (Example with pnpm):

```sh
pnpm exec playwright install --with-deps
```

Ready to run the Storybook tests, you must first have Storybook executed `pnpm storybook` and in another terminal execute `pnpm test:storybook`

#### Connect with Jest test files

If you don't want to use Storybook tests directly, you can also tell Storybook which test file(s) correspond to the component's story. To obtain this information you must execute `prebuild:storybook` (**This JSON is not updated automatically if the tests change**) this will generate a JSON with the test information necessary for Storybook to work

```ts
//.storybook/preview.ts
import results from '../.jest-test-results.json';

export const decorators = [
  withTests({
    results,
  }),
];

//Button.stories.tsx
export const Default: Story = {
  args: {
    /* ... */
  },
  parameters: {
    //Add the name of file(s) that correspond to the test
    jest: ['Button.test.tsx'],
  },
};
```

## 🎨 Styling

For styles, added Tailwind CSS, a CSS framework for quick styling. In case you need to use your own CSS, it is recommended to use [CSS Modules][css-module-link].

### CVA

The template comes by default with [cva][cva-docs-link], [clsx][clsx-docs-link] and [tw-merge][tw-merge-docs-link]. These utilities serve to facilitate the creation of variants for your components, this will help you maintain a design system easily. Then CVA will simplify the process of creating variants for your design systems, without compromising CSS control.

## :milky_way: State Management

The template comes by default with [Zustand][zustand-docs-link], a great state manager that is quite simple, but very powerful. This great state manager is the option I recommend but if you don't like it you can use whatever you want.

### Other options

In case Zustand is not your grade, it leaves you with other good options:

- [**Jotai**][jotai-docs-link]: This global state management library developed for React, and is from the same creators of Zustand. It has an **atomic approach** based on the concept of atoms and offers a simple and granular API to manage its state, while still being highly optimized to reduce package size.

- [**Recoil**][recoil-docs-link]: Is a state management library developed by Meta, designed specifically for React applications. It allows you to create a data flow that **flows** from atoms (shared state) through selectors (pure functions) and towards your React components. Its key benefit is the ability to update components only when the state they are subscribed to changes, reducing unnecessary replays and keeping your application fast and efficient.

## :pencil: Environment Variables

[T3 Env][t3-env-docs-link] is a library that **facilitates** the **validation** and **transformation** of environment variables at compile time, as well as checking their types. This tool ensures that your application uses the correct environment variables and that their values ​​match the expected types, eliminating the risk of runtime errors due to incorrect use of these variables.

The configuration is managed in the `env.js` file. You just need to define the variables for the client and server, and then import `env` into any file in your project to use them.

If you have an error with the variables you will see a message similar to this in the console specifying the error:

```sh
  ❌ Invalid environment variables: { VARIABLE: [ 'Error message' ] }
```

## :fishsticks: Husky Git Hooks

Husky makes it easy to configure and manage these git hooks directly from your project, without having to do it manually in the file system. This will allow you to automate certain tasks, which normally can be easily forgotten.

In this case there is a script that automatically raises 3 hooks for you:

### pre-commit

The pre-commit hook runs just before committing, allowing you to run a script to verify or modify the code. In this case, the hook executes the command

```sh
npx lint-staged
```

#### Lint staged

[**Lint staged**][lintstaged-docs-link] is a tool that allows you to run linters or other code quality tasks only on files that are about to be committed. This makes the validation process more efficient, by only validating in each commit the files that were modified (Assuming that the previous files have already passed the linting process). For NextJS, you can change the lint staged configuration in the `.lintstagedrc.cjs` file. In this case lint staged executes these two commands:

```sh
prettier --write --file "stagedFiles..."
```

Then

```sh
next lint --fix --file "stagedFiles..."
```

### commit-msg

The commit-msg hook is executed before making a commit, but after validating the pre-commit, it allows you to validate the code message to maintain a convention in your project. The hook is running:

```sh
npx commitlint --edit
```

#### Commit lint

[**Comitlint**][commitlint-docs-link] is a tool used to ensure that commit messages follow a predefined format, such as semantic commits. This is useful for improving the readability and structure of messages, making it easier to maintain and understand project history.

### pre-push

The pre-push hook is executed just before executing the push and allows you to validate the complete code before sending it to the remote repository and even cancel the push if necessary. The hook is running:

```sh
npx tsc && npx jest --detectOpenHandles --passWithNoTests
```

In this case, only the tests are validated before pushing

<!-- Badges -->

[commit-activity-badge]: https://img.shields.io/github/commit-activity/m/MarcossIC/next-template/main?logo=github
[created-at-badge]: https://img.shields.io/github/created-at/MarcossIC/next-template?logo=github
[made-by-badge]: https://img.shields.io/badge/made_by-MarcossIC-blue?color=4017d1&link=https://marcosic.netlify.app&logo=readdotcv
[status-workflow-badge]: https://img.shields.io/github/actions/workflow/status/MarcossIC/next-template/ci.yml?label=Status

<!-- Links -->

[status-workflow-badge-link]: https://github.com/MarcossIC/next-template/actions/workflows/next_analysis.yml
[made-by-badge-link]: https://marcosic.netlify.app
[storybook-play-link]: https://storybook.js.org/docs/writing-stories/play-function#writing-stories-with-the-play-function
[css-module-link]: https://nextjs.org/docs/pages/building-your-application/styling/css-modules
[cva-docs-link]: https://cva.style/docs
[clsx-docs-link]: https://github.com/lukeed/clsx#readme
[tw-merge-docs-link]: https://github.com/dcastil/tailwind-merge
[zustand-docs-link]: https://zustand.docs.pmnd.rs/getting-started/introduction
[jotai-docs-link]: https://github.com/pmndrs/jotai
[recoil-docs-link]: https://recoiljs.org/docs/introduction/installation
[t3-env-docs-link]: https://env.t3.gg/
[commitlint-docs-link]: https://commitlint.js.org/
[lintstaged-docs-link]: https://github.com/lint-staged/lint-staged
[playwright-install-link]: https://playwright.dev/docs/intro
