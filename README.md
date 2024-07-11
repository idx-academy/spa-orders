# spa-orders

## Table of Contents

- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Git flow](#git-flow)
- [Project structure](#project-structure)
- [Code conventions](#code-conventions)
- [Styling](#styling)
- [Testing](#testing)
- [References](#references)

## Getting Started

1. Use node version from `.nvmrc`

```
nvm use
```

2. Install dependencies

```
npm install
```

3. Start the project

```
npm start
```

4. Open [http://localhost:3030](http://localhost:3000) with your browser to see the result.

## Scripts

| Name                       | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| `npm run start`            | Start the project in development mode                        |
| `npm run start:prod`       | Start the project with production settings including envs    |
| `npm run start:test`       | Start the project with cypress testing settings              |
| `npm run test`             | Runs unit tests                                              |
| `npm run test:coverage`    | Runs unit tests with collecting coverage                     |
| `npm run test:mutation`    | Runs mutation tests                                          |
| `npm run typescript:check` | Checks the validity of types                                 |
| `npm run lint`             | Lints the project files                                      |
| `npm run lint:fix`         | Fixes lint errors in the project                             |
| `npm run format:check`     | Checks if there are prettier formatting errors in src folder |
| `npm run format:fix`       | Fixes all prettier format error inside src folder            |

## Git flow

### Pull requests

- Use `git rebase` to merge branches locally.
- Use `Squash and merge` option to merge PR into develop

### Main branches

- `main` - production branch
- `develop` - development branch

### Branch naming

Use pattern: `<prefix>/<issue_id>/<short_description>`

For example: `feature/41/navbar`

Allowed prefixes are:

- `feature` - for new feature
- `hotfix` - for urgent fixes
- `bugfix` - for fixing existing functionality
- `tests` - for unit, mutation or e2e tests

### Before starting work on a task:

Switch to the develop branch and download the latest changes.

`git pull origin develop` – charges changes

Create a branch for the task:

`git checkout -b your_branch_name`

You work

### Finished work, or want to synchronize changes with develop before continuing.

`git add .`
`git commit -m 'Commit’s label'` – save changes

then you need to update develop

`git checkout develop` – switch to develop
`git pull origin develop` – charges changes

And back to your branch

`git checkout your_branch_name`

Then we should rebase

`git rebase develop`

If there are no conflicts, continue the work or push the branch.

`git push origin your_branch_name`

If there are problems, resolve conflicts

`git rebase -–continue`
`git push origin your_branch_name`

and then finish the work.

### To switch to existing remote branches and work with them locally:

- Make a `git pull` on the develop branch and get the remote branch locally
- Check all available branches
  `git branch -a` (in red) are removed
  do git checkout branch on the desired branch. It is important that the branches start with the prefix feature/ bugfix/ that is, copy from the beginning of the prefixes and do -`git checkout feature/update-react-to-v18` for example:
  remotes/origin/feature/update-react-to-v18 - copy only this part
- if existing node_modules remove them and install them again npm ci
- finished work - `git add .` what needs to be added -`git commit -m 'message'`
- `git push origin branch_name`

### Conflict resolution:

`git rebase develop` (have conflicts)

After conflict resolution:
`git rebase --continue`

Do until conflicts are resolved for all files
(resolve rebase successfully)

`git push --force-with-lease origin branch_name`
(after resolving conflicts - push)

## Project structure

- **Project root**

  - `/code` - root folder for application code
    - `/config` - global config files (for tests, babel, webpack) and root html file
    - `/reports` - reports regarding mutation testing
    - `/src` - project source code folder
      - `/assets` - for assets ('.png', '.svg', '.jpg', 'webp', ...)
      - `/components` - for shared components
      - `/constants` - for shared constants
      - `/containers` - for bigger than components and smaller than pages components
      - `/constants` - for react contexts
      - `/hooks` - for reusable hooks
      - `/layouts` - for reusable relatively large page parts (headers, footers, sidebars, navbars, containers, etc.)
      - `/pages` - for project pages
      - `/routes` - for app routing
      - `/store` - for globally managed application state
      - `/styles` - for global styling and defining design system constants
      - `/types` - for global types (utility types, business model types etc)
      - `/utils` - for reusable functions
    - `/stryker-config` - place for storing incremental file (for mutation tests)
  - `/e2e` - for integration tests
  - `/mock-backend` - express playground to test backend features while real backend is in process of developing

## Styling

### Motivation

The general idea of our styling system is to create custom components (building blocks), that starts of prefix `App`, like `AppButton`, `AppTypography` etc. Then we use MUI component inside as a base and add `scss` styles to it to customize it for our needs. Then we need to use `App`-prefixed component in our project and do not import it from mui directly. For building more complex components, like `containers`, `layouts` and `pages` we should use our wrappers around mui component. In that way we can easily migrate from mui to another ui package without huge refactorings.

### Steps to create wrapper around mui component

For example we want to create `Button` component. The following steps should be followed:

1. Create folder, prefixed with `app`: `app-button`
2. Create file prefixed with `App`: `AppButton.tsx`
3. Create scss file for component: `AppButton.scss`
4. Import scss file into `AppButton.tsx` using import alias: `import "@/components/app-button/AppButton.scss";`
5. Import all scss variables from design system: `@import "@design-system";`
6. Create base css class, prefixed with `spa`: `.spa-button`:

### Scss coding rules

1. Use colors, spacings, font-weights, font-sizes, test-transforms from design system and do not hardcode it. If you discovered a new color or size, please discuss it with a team.
2. If we need modifier classes, we should use `&` operator. Here are some examples:

```scss
.spa-button {
  &__primary {
    // Styles from primary button variant
  }

  &__medium {
    // Styles for medium button size
  }

  &--active {
    // Styles for active state
  }

  &:disabled {
    // Styles for disabled state
  }
}
```

3. Avoid using `scss` variable directly. Instead create `css` variable with default value of `scss` variable. The name of `css` variable should start with `spa` prefix and reflect content, stored in it. It should be in `kebab` case. It can help overriding just variable value to change rest of styles and make our design system more customisable

Examples:

```scss
background-color: var(--spa-button-bg-color, $purple);
color: var(--spa-button-color, $white);
font-size: var(--spa-typography-concept-font-size, $fs-4xl);
font-weight: var(--spa-typography-subtitle1-font-weight, $fw-extra-bold);
```

4. If you want to use media query, use mixin `breakpoint` like following:

```scss
@include breakpoint("md") {
  border-radius: spacing(1);
}
```

5. If you want to set margin, padding, gap or border-radius, use `spacing` function. `spacing(1)` means `4px`,` spacing(2)` means `8px`, `spacing(3)` - `12px` and so on:

```scss
border-radius: spacing(2);
padding: spacing(2) spacing(3);
margin-bottom: spacing(4);
gap: spacing(4);
```

### Also some rules related to styling

- Use only default imports for mui components, because it improves performance
- Use css variables from our scss design system

## Code conventions

### General

- Use default export for components that look like following:

```tsx
type ComponentProps = {
  // ...
};

const Component = ({ prop1 }: ComponentProps) => {
  // ...
};

export default Component;
```

- Handlers should be arrow functions and start from prefix `handle`, for instance `handleButtonClick`, `handlePositionChange`
- Use modular structure for our components. Tests, translations, styles etc should be on the same level with the component. Also we can use same folders, used on the root level of our project. Folder should be named in kebab case, component in camel case. For example:

```
  messages
    en.json
    index.ts
    uk.json
  components
    navbar
      Navbar.tsx
      Navbar.test.tsx
      Navbar.scss
  hooks
    use-burger-menu
      useBurgerMenu.tsx
      useBurgerMenu.test.tsx
  Header.tsx
  Header.test.tsx
  Header.types.tsx
  Header.scss

```

- The name of variable should always reflect the type it stores. If you use function, the main word in it's name should be a verb. If you use boolean, prefer names, starting with prefixes `is`, `should` for example `isLoading`, `shouldRender`
- Move logic above `return` statement to make our jsx as clean as possible
- Avoid using relative imports and use import aliases everywhere
- Use semantic elements instead of divs to improve accessbility

### Typescript

- Use `type` keyword to declare every typescript entity. Interfaces should be used only in edge case scanarios, when we need to extend types of external package.
- Declare types in PascalCase
- Use objects with `as const` instead of `enum`
- Declare all local types locally (props, complex types that are used only in one file) as much as possible. If type becomes repeated, we should consider moving it to global `types` folder

### Imports organization

1. Imports from packages, that include word `react`
2. Imports from third party imports
3. Imports from `App`
4. Imports from `layouts`
5. Imports from `containers`
6. Imports from `components`
7. Other folders including `@/`
8. `scss` files
9. Relative imports

You can see provided examples of correctly organized imports:

```jsx
import { Ref, forwardRef, PropsWithChildren } from "react";

import PeopleIcon from "@mui/icons-material/People";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import App from "@/App";

import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import callToActionItems from "@/containers/call-to-action/CallToAction.constants";

import AppContainer from "@/components/app-container/AppContainer";
import AppTypography from "@/components/app-typography/AppTypography";

import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import { SnackbarConfigWithTimeout } from "@/types/snackbar.types";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

import "@/components/app-button/AppButton.scss";

import "./AppSnackbar.constants"
```

## Testing

### Running Tests

To run the unit tests, use the following command:

```
npm run test
```

To run unit tests and collect coverage information:

```
npm run test:coverage
```

To run mutation tests:

```
npm run test:mutation
```

### Unit Tests

Unit tests are used to test individual components and functions in isolation. They should be placed in the same folder as the component they are testing, with the `.test.tsx` suffix

```
components
  header
    Header.tsx
    Header.test.tsx
```

### Mutation Tests

Mutation testing helps to ensure the quality of the unit tests by introducing changes (mutations) to the code and checking if the tests catch the errors. Mutation testing reports are generated and stored in the `/reports` folder

To run mutation tests:

```
npm run test:mutation
```

### End-to-End (E2E) Tests

E2E tests are used to test the entire application flow. These tests are located in the `/e2e` folder and can be run using a test runner like Cypress

### Testing Tools

- `Jest:` Used for running unit tests and collecting coverage information
- `Stryker:` Used for running mutation tests
- `Cypress:` Used for running end-to-end tests

## References

- [Use-case diagram](https://app.diagrams.net/#G17iCThtH58keC83T8SUX5Lpo9Oiipvetp#%7B%22pageId%22%3A%22c0BYFkauXTc5PcYzelpT%22%7D)
- [Domain model diagram](https://app.diagrams.net/#G1elOkc_kON3mlytmNawvccNE0cexzDkxE#%7B%22pageId%22%3A%22C5RBs43oDa-KdzZeNtuy%22%7D)
- [Original mockup](https://www.wix.com/website-template/view/html/2860?originUrl=https%3A%2F%2Fwww.wix.com%2Fwebsite%2Ftemplates%3Fcriteria%3DComputer%2BStore&tpClick=view_button&esi=c608ee53-83a1-4243-a123-6eb16a1c98f6)
- [Modified mockup](https://oliagrytsak1991.wixsite.com/my-site-2)
- [Frontend deployment](http://idxacademy.xyz/)
- [Backend deployment](http://api.idxacademy.xyz/retail)
- [Swagger link](http://api.idxacademy.xyz/retail/swagger-ui/index.html)
