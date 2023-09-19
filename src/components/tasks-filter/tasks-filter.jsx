import React from 'react'

const TaskFilter = ({ filter, setFilter }) => {
  return (
    <ul className="filters">
      <li>
        <button
          className={filter === 'all' ? 'selected' : ''}
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
          className={filter === false ? 'selected' : ''}
          type="button"
          onClick={() => {
            setFilter(false)
          }}
        >
          Active
        </button>
      </li>
      <li>
        <button className={filter === true ? 'selected' : ''} type="button" onClick={() => setFilter(true)}>
          Completed
        </button>
      </li>
    </ul>
  )
}

export default TaskFilter
