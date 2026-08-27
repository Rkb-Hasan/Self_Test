# Task Board

A simple Kanban-style task manager built with vanilla JavaScript, HTML, and CSS. Tasks move through three stages, To Do, In Progress, and Done, and everything persists across page reloads using localStorage.

**Live demo:** [taskboard-ten-green.vercel.app](https://taskboard-ten-green.vercel.app/)

## Overview

Task Board is a lightweight project management tool for tracking work in progress. Add a task, watch it move through your workflow with a single click, and clear everything out when you're ready to start fresh. No frameworks, no build tools, just core web fundamentals.

## Features

- Add new tasks through a simple input field
- Move a task forward with one click: To Do → In Progress → Done
- Delete individual tasks from any column
- Clear all tasks at once
- Data persists between sessions via localStorage

## How It Works

Each task is stored as an object with a title and a status (`todo`, `in-progress`, or `done`). On load, the app reads any saved tasks from localStorage and renders them into their respective columns. Adding a task creates a new object with a default status of `todo`, appends it to the state array, re-renders the board, and writes the updated state back to localStorage.

Clicking a task's status button advances it to the next stage. Since Done is the final stage, tasks there no longer show a forward button, only delete. Every action that changes state, adding, advancing, or deleting a task, triggers a re-render and a localStorage update, keeping the UI and stored data in sync.

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- Browser localStorage API

## Running Locally

1. Clone the repository
   ```
   git clone <repo-url>
   ```
2. Open `index.html` in your browser, no build step or dependencies required

## Project Structure

```
task-board/
├── index.html
├── style.css
└── script.js
```
