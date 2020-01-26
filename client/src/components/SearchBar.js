import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      category: 'all',
      location: 'all',
      submitted: false
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) { this.setState({ [e.target.name]: e.target.value }) }

  onSubmit(e) {
    e.preventDefault()
    this.setState({ submitted: true })
  }

  render() {
    if (this.state.submitted) {
      return (
        <Redirect 
          to={{
            pathname: 'search',
            state: {
              category: this.state.category,
              location: this.state.location,
              title: this.state.title
            }
          }} 
        />
      )
    }

    return (
      <form className='form-inline mt-2 mb-2 justify-content-center' onSubmit={this.onSubmit}>
        <label htmlFor='title' className='sr-only'>Title</label>
        <input
          type='text'
          className='form-control mb-2 mr-sm-2'
          placeholder='What'
          required
          autoFocus
          name='title'
          onChange={this.onChange}
        />

        <label htmlFor='category' className='sr-only'>Category</label>
        <select className='custom-select mb-2 mr-sm-2' name='category' onChange={this.onChange} >
          <option defaultValue value='all'>All categories</option>
          {this.props.categories.map((cat) => {
            return <option value={cat} key={cat}>{cat}</option>
          })}
        </select>

        <label htmlFor='location' className='sr-only'>Location</label>
        <select className='custom-select mb-2 mr-sm-2' name='location' onChange={this.onChange} >
          <option defaultValue value='all'>Anywhere</option>
          {this.props.locations.map((loc) => {
            return <option value={loc} key={loc}>{loc}</option>
          })}
        </select>

        <button className='btn btn-primary mb-2 mr-sm-2' type='submit'>Search</button>
      </form>
    )
  }
}

export default SearchBar
