import React, { Component } from 'react'

import Task from '../task'
import './task-list.css'

export default class TaskList extends Component {
  render() {
    const { todos, filter, onDeleted, onToggleCompleted, onEdit } = this.props
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
        />
      )
    })

    return <ul className="todo-list">{component}</ul>
  }
}
