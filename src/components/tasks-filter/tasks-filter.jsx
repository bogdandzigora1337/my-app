import React, { Component } from 'react'

export default class TaskFilter extends Component {
  render() {
    const { filter, setFilter } = this.props
    const stateBtn = ['all', false, true]

    return (
      <ul className="filters">
        <li>
          <button
            className={filter === stateBtn[0] ? 'selected' : ''}
            type="button"
            onClick={() => {
              setFilter('all')
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={filter === stateBtn[1] ? 'selected' : ''}
            type="button"
            onClick={() => {
              setFilter(false)
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button className={filter === stateBtn[2] ? 'selected' : ''} type="button" onClick={() => setFilter(true)}>
            Completed
          </button>
        </li>
      </ul>
    )
  }
}
