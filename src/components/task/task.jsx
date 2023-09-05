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

  formatTime = (sec) => {
    const minutes = Math.floor(sec / 60)
    const seconds = sec % 60
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
    return `${formattedMinutes}:${formattedSeconds}`
  }

  getTimeDisplay = () => {
    const { created } = this.props
    const currentTime = new Date().getTime()
    const timeDifference = (currentTime - created) / 1000

    if (timeDifference < 60) {
      return `${Math.floor(timeDifference)} second${timeDifference === 1 ? '' : 's'} ago`
    } else {
      const minutes = Math.floor(timeDifference / 60)
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
    }
  }

  render() {
    const { label, onDeleted, onToggleCompleted, completed, onToggleRunning, isRunning } = this.props
    const { isEditing, editText } = this.state

    const timeDisplay = this.getTimeDisplay()

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
            <span className="title">{label}</span>
            <span className="description">
              <button
                className={`${completed ? null : isRunning ? 'icon  icon-pause' : 'icon  icon-play'}`}
                onClick={onToggleRunning}
              ></button>
              <span style={{ marginLeft: '10px' }}>{this.formatTime(this.props.seconds)}</span>
            </span>
            <span className="created">created {timeDisplay}</span>
          </label>
          <button className="icon icon-edit" onClick={this.handleEditClick}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>

        {isEditing && (
          <input
            type="text"
            className="edit"
            value={editText}
            onChange={this.handleEditInputChange}
            onKeyDown={this.handleEditInputKeyDown}
            autoFocus
          />
        )}
      </li>
    )
  }
}
