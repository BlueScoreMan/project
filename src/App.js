import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [], // Array of items
      input: '', // Input from textfield -> added to list with submitButton
      isEditing: false // Switch from edit to non-edit mode
    }
  }
  onEditing = () => {
    this.setState({ isEditing: !this.state.isEditing })
  }
  onChange = e => { }
  onSubmit = e => { }
  onClick = id => { }
  onDelete = id => { }
  render() {
    return (
      <form id="todo-list">

        {this.state.items.length < 0 ?
          <span className="todo-wrap">
            <span >
              <input type="checkbox" />
              <label for="1" className="todo"><i className="fa fa-check"></i></label>
            </span>

            <span className="delete-item" title="remove" >
              <i className="fa fa-times-circle"></i>
            </span>
          </span> : <p></p>
        }
        {
          this.state.isEditing ?
            <span className="todo-wrap" ><input /></span> : false
        }
        <div id="add-todo" onClick={() => this.onEditing()}><i className="fa fa-plus"></i> &nbsp; Add an Item</div>
      </form>
    );
  }
}
