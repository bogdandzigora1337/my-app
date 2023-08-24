import React, { Component } from 'react'

import './new-task-form.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
  }

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    if (this.state.label.length !== 0) {
      this.props.onItemAdded(this.state.label)
    }

    this.setState({
      label: '',
    })
  }

  render() {
    return (
      <form className="header" onSubmit={this.onSubmit}>
        <h1>Todos</h1>
        <label>
          Todo
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={this.state.label}
          />
        </label>
      </form>
    )
  }
}
