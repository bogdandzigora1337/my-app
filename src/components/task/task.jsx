import React, { Component } from 'react'

import './task.css'

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      editText: this.props.label,
    }
  }

  handleEditClick = () => {
    this.setState({
      isEditing: true,
    })
  }

  handleEditInputChange = (event) => {
    this.setState({
      editText: event.target.value,
    })
  }

  handleEditInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.setState({
        isEditing: false,
      })
      this.props.onEdit(this.state.editText)
    }
  }

  render() {
    const { label, onDeleted, onToggleCompleted, completed, created } = this.props
    const { isEditing, editText } = this.state
    const currentTime = new Date().getTime()
    const timeDifference = (currentTime - created) / 1000
    let timeDisplay
    if (timeDifference < 60) {
      timeDisplay = `${timeDifference.toFixed(0)} seconds ago`
    } else if (timeDifference >= 60) {
      const minutes = Math.floor(timeDifference / 60)
      timeDisplay = `${minutes} minute${minutes === 1 ? '' : 's'} ago`
    }

    let classNames = ''
    if (completed) {
      classNames += 'completed'
    }
    if (isEditing) {
      classNames += 'editing'
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input type="checkbox" className="toggle" onChange={onToggleCompleted} checked={completed} />

          <label>
            <span className="description">{label}</span>
            <span className="created">created {timeDisplay}</span>
          </label>
          <button className="icon icon-edit" onClick={this.handleEditClick}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>

        {isEditing ? (
          <input
            type="text"
            className="edit"
            value={editText}
            onChange={this.handleEditInputChange}
            onKeyDown={this.handleEditInputKeyDown}
            autoFocus
          />
        ) : null}
      </li>
    )
  }
}
