import React from 'react'

import Task from '../task/task'
import './task-list.css'

const TaskList = ({ todos, filter, onDeleted, onToggleCompleted, onEdit, onToggleRunning }) => {
  /* eslint-disable indent */
  const filteredTodos =
    filter === 'all'
      ? todos
      : todos.filter((todo) => {
          return todo.completed === filter
        })
  /* eslint-enable indent */
  const component = filteredTodos.map((item) => {
    const { id, ...itemProps } = item
    return (
      <Task
        key={item.id}
        {...itemProps}
        onDeleted={() => onDeleted(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        onEdit={(newText) => onEdit(id, newText)}
        created={item.created}
        onToggleRunning={() => onToggleRunning(id)}
      />
    )
  })

  return <ul className="todo-list">{component}</ul>
}

export default TaskList
