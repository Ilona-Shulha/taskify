# taskify

This template should help get you started developing with Vue 3 in Vite.

## About project

An application for task management has been implemented.
On the main page, users can add, edit, and delete projects. Each row is also a link to the page displaying tasks for the corresponding project. Users can adjust the column widths. Additionally, sorting and filtering functionalities have been implemented.

On the tasks page, the tasks of the selected project are loaded. There is a chart displaying the current project's tasks by status. Sorting and filtering functionalities are also implemented here and persist after page reloads using localStorage. A modal window is used for adding and editing tasks.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
