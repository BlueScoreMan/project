import React from 'react';
import './App.css';

const Progress = props => {
  const { progress } = props
  return (<div class="progress">
    <div class="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{ width: progress + '%' }}>
      {progress + '%'}
    </div>
  </div>)
}
const List = props => {
  const { items, onClick, onDelete } = props
  if (items.length > 0) {
    return items.map(item => {
      return (<span className="todo-wrap">
        <span onClick={() => onClick(item.id)}>
          <input type="checkbox" checked={item.isCompleted} />
          <label for="1" className="todo"><i className="fa fa-check"></i>{item.text}</label>
        </span>

        <span className="delete-item" title="remove" onClick={() => onDelete(item.id)} >
          <i className="fa fa-times-circle"></i>
        </span>
      </span>)
    })
  } else {
    return (<p>No items in the list</p>)
  }
}
const Input = props => {
  const { isEditing, input, onChange } = props
  if (isEditing) {
    return (<span className="todo-wrap"> <input value={input} onChange={(e) => onChange(e)} /></span>)
  } else { return false }
}
const Add = props => {
  const { onEditing } = props
  return (<div id="add-todo" onClick={() => onEditing()}><i className="fa fa-plus"></i> &nbsp; Add an Item</div>)
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      input: '',
      isEditing: false,
      progress: 0
    }
  }
  componentDidMount() {
    let all = localStorage.getItem('items') !== null ? JSON.parse(localStorage.getItem('items')) : []
    this.setState({ items: all }, () => this.setProgress(this.state.items))
  }
  componentDidUpdate() {
    localStorage.setItem('items', JSON.stringify(this.state.items))
  }
  onEditing = () => {
    this.setState({ isEditing: !this.state.isEditing })
  }
  onChange = e => {
    this.setState({ input: e.target.value })
  }
  onSubmit = e => {
    e.preventDefault()
    const item = {
      id: new Date().getTime(),
      text: this.state.input,
      isCompleted: false
    }
    if (!this.state.input.length) { return false }
    this.setState((state) => ({
      items: state.items.concat(item),
      input: ''
    }), () => { this.setProgress(this.state.items) })
  }
  onClick = id => {
    let updated = this.state.items.map(item => {
      if (item.id === id) { item.isCompleted = !item.isCompleted }
      return item
    })
    this.setState({ items: updated }, () => this.setProgress(updated))
  }
  onDelete = id => {
    let filtered = this.state.items.filter(item => {
      if (item.id !== id) { return item }
    })
    this.setState({ items: filtered }, () => this.setProgress(filtered))
  }
  setProgress = items => {
    let checked = items.filter(item => { return item.isCompleted })
    let progress = checked.length / items.length
    this.setState({ progress: Math.floor(progress * 100) })
  }

  render() {
    return (
      <form id="todo-list" onSubmit={(e) => this.onSubmit(e)}>
        <Progress {...this.state} /><br />
        <List {...this.state} onClick={this.onClick} onDelete={this.onDelete} />
        <Input {...this.state} onChange={this.onChange} />
        <Add onEditing={this.onEditing} />
      </form>
    );
  }
}
