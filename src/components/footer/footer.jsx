import React, { Component } from 'react'

import TaskFilter from '../tasks-filter'

import './footer.css'

export default class Footer extends Component {
  render() {
    var { filter, todos, setFilter, onDeletedCompetedTasks, isRunning, seconds } = this.props
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
}
