import { client } from '../../api/client'
import { createSelector } from 'reselect'
import { StatusFilters } from '../filters/filtersSlice'

const initialState = [
  // { id: 0, text: 'Learn React', completed: true },
  // { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
  // { id: 2, text: 'Build something fun!', completed: false, color: 'blue' },
]

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded': {
      // Can return just the new todos array - no extra object around it
      return [...state, action.payload]
    }
    case 'todos/todosLoaded': {
      return action.payload
    }
    case 'todos/todoToggled': {
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo
        }

        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    }
    case 'todos/colorSelected': {
      const { color, todoId } = action.payload
      return state.map((todo) => {
        if (todo.id !== todoId) {
          return todo
        }

        return {
          ...todo,
          color,
        }
      })
    }
    case 'todos/todoDeleted': {
      return state.filter((todo) => todo.id !== action.payload)
    }
    case 'todos/allCompleted': {
      return state.map((todo) => {
        return { ...todo, completed: true }
      })
    }
    case 'todos/completedCleared': {
      return state.filter((todo) => !todo.completed)
    }

    default:
      return state
  }
}

export const todosLoaded = (todos) => {
  return {
    type: 'todos/todosLoaded',
    payload: todos,
  }
}

export const todoAdded = (todo) => {
  return {
    type: 'todos/todoAdded',
    payload: todo,
  }
}

export function fetchTodos() {
  return async function fetchTodosThunk(dispatch, getState) {
    const response = await client.get('/fakeApi/todos')
    console.log('RESPONSE', response)
    dispatch(todosLoaded(response.todos))
  }
}

export function saveTodo(text) {
  return async function saveNewTodoThunk(dispatch, getState) {
    const initialTodo = { text }
    const response = await client.post('/fakeApi/todos', { todo: initialTodo })
    console.log(response.todo)
    dispatch(todoAdded(response.todo))
  }
}

export const selectTodos = (state) => state.todos

export const selectTodoById = (state, todoId) => {
  return selectTodos(state).find((todo) => todo.id === todoId)
}
//selectors
export const selectTodoIds = createSelector(
  // First, pass one or more "input selector" functions:
  (state) => state.todos,
  // Then, an "output selector" that receives all the input results as arguments
  // and returns a final result value
  (todos) => todos.map((todo) => todo.id)
)

export const selectFilteredTodos = createSelector(
  (state) => state.todos,
  (state) => state.filters,
  (todos, filters) => {
    const { status, colors } = filters
    const showAllCompletions = status === StatusFilters.All
    if (showAllCompletions && colors.length === 0) {
      return todos
    }

    const completedStatus = status === StatusFilters.Completed
    return todos.filter((todo) => {
      const statusMatches =
        showAllCompletions || todo.completed === completedStatus
      const colorMatches = colors.length === 0 || colors.includes(todo.color)
      return statusMatches && colorMatches
    })
  }
)

export const selectFilteredTodoIds = createSelector(
  selectFilteredTodos,
  (filteredTodos) => filteredTodos.map((todo) => todo.id)
)
