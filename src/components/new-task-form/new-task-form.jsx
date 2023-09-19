import React, { useState } from 'react'

import './new-task-form.css'

const NewTaskForm = ({ onItemAdded }) => {
  const [label, setLabel] = useState('')

  const onLabelChange = (event) => {
    setLabel(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (label.length !== 0) {
      onItemAdded(label)
    }

    setLabel('')
  }

  return (
    <form className="header" onSubmit={onSubmit}>
      <h1>Todos</h1>
      <label>
        Todo
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={onLabelChange}
          value={label}
        />
      </label>
    </form>
  )
}

export default NewTaskForm
