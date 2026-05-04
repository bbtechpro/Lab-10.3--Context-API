# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
Context API Implementation
Scenario
You are tasked with building a functional Todo application. Instead of relying on prop drilling or a complex third-party state management library for this scale, you will leverage React’s Context API to manage various aspects of the application’s state. This includes managing the list of todos, current visibility filters, and a simple theme.

This lab will provide practical experience in designing multiple contexts, implementing providers, consuming context values in components, and handling more involved state updates. You will also explore basic persistence and optimization considerations with Context.

Learning Objectives
Upon successful completion of this lab, you will be able to:

Design and implement multiple, independent contexts for different pieces of global state.
Create and use Context Providers to make state and dispatch functions available throughout the component tree.
Consume context values and functions in components using the useContext hook.
Manage complex state (e.g., an array of objects, filter states) using useState or useReducer within context providers.
Implement features requiring interaction between different contexts (e.g., filtering todos).
Add a persistence layer to a Context-based application (e.g., using localStorage).
Understand basic performance considerations when working with Context API.
Project Requirements
Build a Todo application with the following features, primarily using the Context API for state management.

1. Core Todo Management (TodoContext)
State: An array of todo items. Each todo item should have at least:
id: A unique identifier (string or number).
text: The content of the todo (string).
completed: A boolean indicating if the todo is completed.
Actions (exposed via context):
addTodo(text: string): Adds a new todo item to the list.
toggleTodo(id: string | number): Toggles the completed status of a todo item.
deleteTodo(id: string | number): Removes a todo item from the list.
editTodo(id: string | number, newText: string): Edits the text of an existing todo item.
clearCompleted(): Removes all completed todos.
Components:
TodoInput: An input field to add new todos.
TodoList: Displays the list of todo items.
TodoItem: Represents a single todo item, allowing interaction (toggle, delete, edit).
2. Visibility Filters (FilterContext)
State: The current visibility filter. Possible values: ‘all’, ‘active’, ‘completed’.
Actions (exposed via context):
setFilter(filter: string): Sets the current filter.
Functionality:
The TodoList should display todos based on the currently active filter from FilterContext.
FilterButtons: A component that displays buttons to change the current filter.
3. Theme Switching (ThemeContext)
State: The current theme. Possible values: ‘light’, ‘dark’.
Actions (exposed via context):
toggleTheme(): Switches between ‘light’ and ‘dark’ themes.
Functionality:
The application should visually change based on the selected theme (e.g., background colors, text colors). Apply theme changes to the main app container and ideally a few key components.
ThemeToggleButton: A button to toggle the theme.
4. Persistence Layer
Functionality:
The state of the todos (from TodoContext) and the current theme (from ThemeContext) should be persisted to localStorage.
When the application loads, it should attempt to rehydrate these states from localStorage.
Updates to todos or theme should automatically update localStorage.

Implementation Guidelines
State Management within Contexts: You can use useState for simpler contexts (like FilterContext or ThemeContext). For TodoContext, consider using useReducer as it involves more complex state transitions, though useState is also acceptable if managed well.
Provider Nesting: Wrap your main application component with the necessary context providers. You might create a root provider component (e.g., AppProviders) to keep your App.tsx clean.
TypeScript (Optional but Recommended): Define types/interfaces for your todo items, context values, and props.
Optimization: While not the primary focus, think about memoizing context values (using useMemo for objects/arrays, useCallback for functions) to prevent unnecessary re-renders of consuming components. This is especially relevant for the persistence layer updates.