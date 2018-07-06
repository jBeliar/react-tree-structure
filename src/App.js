import React, { Component } from 'react';
import './App.css';

import Node from './components/Node'
import { fetchTreeIssues } from './services/fetchService'
import {
  removeIssueByPath,
  setIssueTagByPath,
  addIssueTagByPath,
  generateIssue
} from './utils/utils'

class App extends Component {
  constructor() {
    super()
    this.state = {
      rootIssues: null,
      addingRootIssue: false,
      newIssueValue: ''
    }
  }

  componentDidMount() {
    fetchTreeIssues().then(issues => {
      this.setState({
        rootIssues: issues
      })
    })
  }

  onDrop(arr) {
    this.updateIssues(
      removeIssueByPath(arr, this.state.rootIssues)
    )
  }

  onEdit(value, arr) {
    this.updateIssues(
      setIssueTagByPath(value, arr, this.state.rootIssues)
    )
  }

  onAdd(value, arr) {
    this.updateIssues(
      addIssueTagByPath(value, arr, this.state.rootIssues, arr)
    )
  }

  updateIssues(rootIssues) {
    console.log(rootIssues)
    this.setState({rootIssues})
  }

  onInputNewIssueChange(event) {
    this.setState({
      newIssueValue: event.target.value
    })
  }

  cancel() {
    this.setState({
      newIssueValue: '',
      addingRootIssue: false
    })
  }

  getAddingForm() {
    return (
      <div>
        <input type="text" autoFocus value={this.state.newIssueValue} onChange={e => this.onInputNewIssueChange(e)}/>
        <button className='btn-green' onClick={() => this.onAddNewRootIssue(this.state.newIssueValue)}>Add</button>
        <button className='btn-red' onClick={() => this.cancel()}>Cancel</button>
      </div>
    )
  }

  onAddNewRootIssue() {
    this.cancel()
    const issuetag = this.state.newIssueValue.trim()
    if (issuetag !== '') {
      this.updateIssues([
          generateIssue(issuetag, []),
          ...this.state.rootIssues
        ]
      )
    }
  }

  showAddNewRootIssueFrom() {
    this.setState({
      addingRootIssue: true
    })
  }

  getRootIssuesView() {
    return this.state.rootIssues.map(issue => {
      return <Node
        value={issue}
        key={issue._id}
        onDrop={arr => this.onDrop(arr)}
        onEdit={(value, arr) => this.onEdit(value, arr)}
        onAdd={(value, arr) => this.onAdd(value, arr)}/>
    })
  }

  getView() {
    return (
      <React.Fragment>
        <button onClick={() => this.showAddNewRootIssueFrom()}>Add new root issue</button>
        {
          this.state.addingRootIssue && this.getAddingForm()
        }
        {this.getRootIssuesView()}
      </React.Fragment>
    )
  }

  render() {
    return (
      <div className="App">
        {this.state.rootIssues ? this.getView() : 'Loading'}
      </div>
    );
  }
}

export default App;
