# Fullstack Open 2025 - Part 1: Introduction to React

## Exercises 1.1 - 1.2

### 1.1: Course Information, step 1
In this exercise, you will create a new React application using Vite. You will modify `main.jsx` and `App.jsx` to display course information such as the course name, parts, and the number of exercises for each part.

**Requirements:**
- Create three components: `Header`, `Content`, and `Total`.
  - `Header` renders the course name.
  - `Content` renders the name and number of exercises for each part.
  - `Total` renders the total number of exercises.

### 1.2: Course Information, step 2
Refactor the `Content` component so that it doesn't render part names and exercise counts directly. Instead, it should render three `Part` components, each of which will display the name and number of exercises for one part.

**Structure:**
- `App.jsx` should pass data to components using props.
