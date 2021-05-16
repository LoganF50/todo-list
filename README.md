# Todo List

[From the Odin Project]

## Completed Features

- save projects/todos between sessions using localStorage
- sortable todos by:
    - alphabetical
    - reverse alphabetical
    - due date oldest first
    - due date newest first
- view todos due today (or earlier)
- view todos due this week (or earlier)

## Features to Implement

- user options
    - date appearance
    - theme
    - etc
- tooltips over icons
- add priorities to todos
    - todos should have some indication of their priority in the main view
    - sortable by priority (and reverse)
- add checklist to todos
- use words for due dates in simple view (Today, Tomorrow, Yesterday, etc)
- move todos to another project
- context menu for projects/todos
- keyboard shortcuts (add todo, add project, etc)
- activity log
- undo button

## Fixes

- wrap todos or scroll todos only
    - currently extends whole page instead of just todos
- selectable sort options (rather than looping in static order)
- responsive design
- form traversal (tab for next item, start in first input, esc to close, etc)
- allow no due date

## Built Using (* indicates new usage)

- html
- css
- js
- *npm
- *webpack
- *es6 modules