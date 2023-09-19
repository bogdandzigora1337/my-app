import React from 'react'

import TaskFilter from '../tasks-filter/tasks-filter'

import './footer.css'

const Footer = ({ filter, todos, setFilter, onDeletedCompetedTasks, isRunning, seconds }) => {
  const countOutstaringTodo = todos.filter((el) => !el.completed).length

  return (
    <footer className="footer">
      <span className="todo-count">{countOutstaringTodo} items left</span>
      <TaskFilter isRunning={isRunning} seconds={seconds} setFilter={setFilter} filter={filter}></TaskFilter>
      <button className="clear-completed" onClick={onDeletedCompetedTasks}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
