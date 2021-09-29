import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveTodo } from '../todos/todosSlice'
const Header = () => {
  const [text, setText] = useState('')
  const [status, setStatus] = useState('idle')
  const dispatch = useDispatch()
  const handleChange = (e) => setText(e.target.value)
  const handleKeyDown = async (e) => {
    const trimmedText = e.target.value.trim()
    // If the user pressed the Enter key:
    if (e.key === 'Enter' && trimmedText) {
      // Dispatch the "todo added" action with this text
      setStatus('loading')
      const saveNewTodoThunk = saveTodo(trimmedText)
      await dispatch(saveNewTodoThunk)
      // And clear out the text input
      setText('')
      setStatus('idle')
    }
  }
  let isLoading = status === 'loading'
  let placeholder = isLoading ? '' : 'What needs to be done?'
  let loader = isLoading ? <div className="loader" /> : null
  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      {loader}
    </header>
  )
}

export default Header
