import {Component} from 'react'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
    isEditing: false,
    isCompleted: false,
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
    isEditing: false,
    isCompleted: false,
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    isEditing: false,
    isCompleted: false,
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
    isEditing: false,
    isCompleted: false,
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
    isEditing: false,
    isCompleted: false,
  },
  {
    id: 6,
    title: 'Fix the production issue',
    isEditing: false,
    isCompleted: false,
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
    isEditing: false,
    isCompleted: false,
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
    isEditing: false,
    isCompleted: false,
  },
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList,
    inputText: '',
  }

  onChangeInput = event => {
    this.setState({inputText: event.target.value})
  }

  onAddTodo = () => {
    const {inputText, todosList} = this.state

    if (inputText.trim() === '') return

    const parts = inputText.trim().split(' ')

    let title = ''
    let count = 1

    const lastValue = Number(parts[parts.length - 1]) // ✅ Convert to number

    if (!Number.isNaN(lastValue)) {
      // ✅ Airbnb compliant
      count = lastValue
      parts.pop()
      title = parts.join(' ')
    } else {
      title = inputText
    }

    const newTodos = Array.from({length: count}).map(() => ({
      id: Date.now() + Math.random(),
      title,
      isEditing: false,
      isCompleted: false,
    }))

    this.setState({
      todosList: [...todosList, ...newTodos],
      inputText: '',
    })
  }

  onDeleteTodo = id => {
    const {todosList} = this.state
    const updatedTodos = todosList.filter(todo => todo.id !== id)
    this.setState({todosList: updatedTodos})
  }

  onToggleEdit = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo,
      ),
    }))
  }

  onSaveTodo = (id, newTitle) => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, title: newTitle, isEditing: false} : todo,
      ),
    }))
  }

  onToggleComplete = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo,
      ),
    }))
  }

  render() {
    const {todosList, inputText} = this.state

    return (
      <div className="todos-bg-container">
        <div className="todos-container">
          <h1 className="heading">Simple Todos</h1>

          {/* Input to Add New Todos */}
          <div className="input-container">
            <input
              type="text"
              value={inputText}
              placeholder="Ex: Buy Milk 3"
              onChange={this.onChangeInput}
              className="input-box"
            />
            <button type="button" className="add-btn" onClick={this.onAddTodo}>
              Add
            </button>
          </div>

          <ul className="todos-list">
            {todosList.map(todo => (
              <TodoItem
                key={todo.id}
                todoDetails={todo}
                onDeleteTodo={this.onDeleteTodo}
                onToggleEdit={this.onToggleEdit}
                onSaveTodo={this.onSaveTodo}
                onToggleComplete={this.onToggleComplete}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
