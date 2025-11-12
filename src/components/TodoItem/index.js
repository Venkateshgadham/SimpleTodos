import {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTitle: props.todoDetails.title,
    }
  }

  onChangeEdit = event => {
    this.setState({newTitle: event.target.value})
  }

  render() {
    const {
      todoDetails: {id, title, isEditing, isCompleted},
      onDeleteTodo,
      onToggleEdit,
      onSaveTodo,
      onToggleComplete,
    } = this.props

    const {newTitle} = this.state

    return (
      <li className="todo-item">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggleComplete(id)}
        />

        {/* Edit input OR display text */}
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={this.onChangeEdit}
            className="edit-input"
          />
        ) : (
          <p className={isCompleted ? 'todo-title completed' : 'todo-title'}>
            {title}
          </p>
        )}

        {/* ✅ Button type added (fixes warnings) */}
        {isEditing ? (
          <button
            type="button"
            className="save-btn"
            onClick={() => onSaveTodo(id, newTitle)}
          >
            Save
          </button>
        ) : (
          <button
            type="button"
            className="edit-btn"
            onClick={() => onToggleEdit(id)}
          >
            Edit
          </button>
        )}

        <button
          type="button"
          className="delete-btn"
          onClick={() => onDeleteTodo(id)}
        >
          Delete
        </button>
      </li>
    )
  }
}

export default TodoItem
