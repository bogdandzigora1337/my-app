import { React } from 'react'
import { createRoot } from 'react-dom/client'

import TodoApp from './components/todoapp/todoapp'

const container = createRoot(document.getElementById('root'))
container.render(<TodoApp />)
