import React, { Component } from 'react'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

import './todoapp.css'

export default class TodoApp extends Component {
  maxId = 100

  state = {
    todoData: [],
    filter: 'all',
  }

  setFilter = (filter) => {
    this.setState({ filter })
  }

  createTodoItem(label) {
    const currentTime = new Date().getTime()
    return {
      label,
      completed: false,
      id: this.maxId++,
      created: currentTime,
    }
  }

  addItem = (text) => {
    // проверка на пустую строку или пробелы
    if (text.trim() === '') {
      return
    }

    //generated id
    const newItem = this.createTodoItem(text)

    //add elem in array
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem]
      return {
        todoData: newArr,
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      // [a, b, c, d, e]
      // [a, b,  , d, e]
      const before = todoData.slice(0, idx)
      const after = todoData.slice(idx + 1)

      const newArray = [...before, ...after]

      return {
        todoData: newArray,
      }
    })
  }

  deleteCompletedTasks = () => {
    this.setState(({ todoData }) => {
      let newArr = JSON.parse(JSON.stringify(todoData))
      newArr = newArr.filter((el) => el.completed === false)

      return {
        todoData: newArr,
      }
    })
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      //1. update object
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, completed: !oldItem.completed }

      //2. construct new array
      const before = todoData.slice(0, idx)
      const after = todoData.slice(idx + 1)

      const newArray = [...before, newItem, ...after]
      return { todoData: newArray }
    })
  }

  onEdit = (id, newText) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const updatedTodoData = todoData.map((todo, index) => {
        if (index === idx) {
          return { ...todo, label: newText }
        }
        return todo
      })
      return {
        todoData: updatedTodoData,
      }
    })
  }

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm addTaskWorm={this.addItem} onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            todos={this.state.todoData}
            filter={this.state.filter}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
            onEdit={this.onEdit}
          />
          <Footer
            setFilter={this.setFilter}
            todos={this.state.todoData}
            filter={this.state.filter}
            onDeletedCompetedTasks={this.deleteCompletedTasks}
            onAllItem={this.allItem}
          ></Footer>
        </section>
      </section>
    )
  }
}
