import React, { useState, useEffect } from 'react'

import './task.css'

const Task = (props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(props.label)
  const [timeDisplay, setTimeDisplay] = useState(getTimeDisplay())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeDisplay(getTimeDisplay())
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleEditInputChange = (event) => {
    setEditText(event.target.value)
  }

  const handleEditInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      setIsEditing(false)
      props.onEdit(editText)
    }
  }

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60)
    const seconds = sec % 60
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
    return `${formattedMinutes}:${formattedSeconds}`
  }

  function getTimeDisplay() {
    const currentTime = new Date().getTime()
    const timeDifference = (currentTime - props.created) / 1000

    if (timeDifference < 60) {
      return `${Math.floor(timeDifference)} second${timeDifference === 1 ? '' : 's'} ago`
    } else {
      const minutes = Math.floor(timeDifference / 60)
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
    }
  }

  const { label, onDeleted, onToggleCompleted, completed, onToggleRunning, isRunning, seconds } = props

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
              onClick={(evt) => {
                evt.stopPropagation()
                onToggleRunning()
              }}
            ></button>
            <span style={{ marginLeft: '10px' }}>{formatTime(seconds)}</span>
          </span>
          <span className="created">created {timeDisplay}</span>
        </label>
        <button className="icon icon-edit" onClick={handleEditClick}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>

      {isEditing && (
        <input
          type="text"
          className="edit"
          value={editText}
          onChange={handleEditInputChange}
          onKeyDown={handleEditInputKeyDown}
          autoFocus
        />
      )}
    </li>
  )
}

export default Task
