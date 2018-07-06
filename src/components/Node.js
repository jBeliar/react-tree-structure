import React, { Component } from 'react';
import './Node.css';

class Node extends Component {

  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      adding: false,
      value: props.value.issuetag,
      newIssueValue: ''
    }
  }

  renderChildren() {
    return this.props.value.children.map( node => {
      return <Node value={node}
        key={node._id}
        onDrop={arr => this.onDrop(arr)}
        onEdit={(value, arr) => this.onEdit(value, arr)}
        onAdd={(value, arr) => this.onAdd(value, arr)}/>
    })
  }

  onAdd(value, arr = []) {
    this.cancel()
    const issuetag = value.trim()
    if (issuetag !== '') {
      this.props.onAdd(issuetag, [this.props.value._id, ...arr])
    }
  }

  onDrop(arr = []) {
    this.props.onDrop([this.props.value._id, ...arr])
  }

  onEdit(value, arr = []) {
    this.cancel()
    const issuetag = value.trim()
    if (issuetag !== '') {
      this.props.onEdit(issuetag, [this.props.value._id, ...arr])
    }
  }

  startEdit() {
    this.setState({
      editing: true
    })
  }

  cancel() {
    this.setState({
      editing: false,
      adding: false,
      value: this.props.value.issuetag,
      newIssueValue: ''
    })
  }

  startAdd() {
    this.setState({
      adding: true
    })
  }

  getSimple() {
    return (
      <React.Fragment>
        {this.props.value.issuetag}
        <button onClick={() => this.startAdd()}>Add child</button>
        <button onClick={() => this.onDrop()}>Drop</button>
        <button onClick={() => this.startEdit()}>Edit</button>
      </React.Fragment>
    )
  }

  onInputChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  onInputNewIssueChange(event) {
    this.setState({
      newIssueValue: event.target.value
    })
  }

  getEditingForm() {
    return (
      <React.Fragment>
        <input type="text" autoFocus value={this.state.value} onChange={e => this.onInputChange(e)}/>
        <button className='btn-green' onClick={() => this.onEdit(this.state.value)}>Save</button>
        <button className='btn-red' onClick={() => this.cancel()}>Cancel</button>
      </React.Fragment>
    )
  }

  getAddingForm() {
    return (
      <div>
        <input type="text" autoFocus value={this.state.newIssueValue} onChange={e => this.onInputNewIssueChange(e)}/>
        <button className='btn-green' onClick={() => this.onAdd(this.state.newIssueValue)}>Add</button>
        <button className='btn-red' onClick={() => this.cancel()}>Cancel</button>
      </div>
    )
  }

  getView() {
    return this.state.editing ? this.getEditingForm() : this.getSimple()
  }

  render() {
    return (
      <div className="Node">
        {this.getView()}
        {this.state.adding && this.getAddingForm()}
        {this.renderChildren()}
      </div>
    );
  }
}

export default Node;
