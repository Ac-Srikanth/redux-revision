import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import TodoListItem from './TodoListItem'
import { selectTodoIds } from './todosSlice'
import { selectFilteredTodoIds } from './todosSlice'
// const selectTodos = (state) => state.todos
// const selectTodoIds = (state) => state.todos.map((todo) => todo.id)
const TodoList = () => {
  const todoIds = useSelector(selectFilteredTodoIds)

  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
