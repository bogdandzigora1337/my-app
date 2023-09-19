import React, { useState, useEffect } from 'react'

import NewTaskForm from '../new-task-form/new-task-form'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'

import './todoapp.css'

const TodoApp = () => {
  const [maxId, setMaxId] = useState(100)
  const [seconds, setSeconds] = useState(0)
  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState('all')

  let timerInterval = null

  useEffect(() => {
    return () => {
      clearInterval(timerInterval)
    }
  }, [])

  const createTodoItem = (label) => {
    const currentTime = new Date().getTime()
    return {
      label,
      completed: false,
      id: maxId,
      created: currentTime,
      isRunning: false,
      seconds: 0,
    }
  }

  const addItem = (text) => {
    if (text.trim() === '') {
      return
    }
    const newItem = createTodoItem(text)
    setMaxId(maxId + 1)
    setTodoData([...todoData, newItem])
  }

  const deleteItem = (id) => {
    const updatedTodoData = todoData.filter((el) => el.id !== id)
    setTodoData(updatedTodoData)
  }

  const deleteCompletedTasks = () => {
    const updatedTodoData = todoData.filter((el) => !el.completed)
    setTodoData(updatedTodoData)
  }

  const onToggleCompleted = (id) => {
    const updatedTodoData = todoData.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    setTodoData(updatedTodoData)
  }

  const onToggleRunning = (id) => {
    const updatedTodoData = todoData.map((item) => {
      if (item.id === id) {
        const newItem = { ...item, isRunning: !item.isRunning }
        if (newItem.completed) {
          clearInterval(timerInterval)
          newItem.isRunning = false
        } else {
          if (newItem.isRunning) {
            timerInterval = setInterval(() => {
              newItem.seconds++
              setSeconds(newItem.seconds)
            }, 1000)
          } else {
            clearInterval(timerInterval)
          }
        }
        return newItem
      }
      return item
    })
    setTodoData(updatedTodoData)
  }

  const editItem = (id, newText) => {
    const updatedTodoData = todoData.map((item) => (item.id === id ? { ...item, label: newText } : item))
    setTodoData(updatedTodoData)
  }

  return (
    <section className="todoapp">
      <NewTaskForm addTaskWorm={addItem} onItemAdded={addItem} />
      <section className="main">
        <TaskList
          todos={todoData}
          filter={filter}
          onDeleted={deleteItem}
          onToggleCompleted={onToggleCompleted}
          onEdit={editItem}
          onToggleRunning={onToggleRunning}
          seconds={seconds}
        />
        <Footer
          setFilter={setFilter}
          todos={todoData}
          filter={filter}
          onDeletedCompetedTasks={deleteCompletedTasks}
          onAllItem={addItem}
        ></Footer>
      </section>
    </section>
  )
}

export default TodoApp
