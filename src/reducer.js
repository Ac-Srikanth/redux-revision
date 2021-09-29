//
import { combineReducers } from 'redux'

import todosReducer from './features/todos/todosSlice'
import filtersReducer from './features/filters/filtersSlice'

const initialState = {
  todos: [
    { id: 0, text: 'Learn React', completed: true },
    { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
    { id: 2, text: 'Build something fun!', completed: false, color: 'blue' },
  ],
  filters: {
    status: 'All',
    colors: [],
  },
}

// export default function rootReducer(state = {}, action) {
//   // always return a new object for the root state
//   return {
//     // the value of `state.todos` is whatever the todos reducer returns
//     todos: todosReducer(state.todos, action),
//     // For both reducers, we only pass in their slice of the state
//     filters: filtersReducer(state.filters, action),
//   }
// }

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  todos: todosReducer,
  filters: filtersReducer,
})
export default rootReducer
