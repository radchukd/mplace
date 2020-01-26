import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class EditAd extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      title: '',
      description: '',
      category: '',
      location: '',
      price: '',
      email: '',
      password: '',
      isAuthor: false,
      submitted: false
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onPassSubmit = this.onPassSubmit.bind(this)
  }

  onChange(e) { this.setState({ [e.target.name]: e.target.value }) }

  onPassSubmit(e) {
    e.preventDefault()

    let body = {
      id: window.location.href.match(/ad\/(.*)\//)[1],
      password: this.state.password
    }

    axios.post('/api/ad/edit', body)
      .then((res) => {
        this.setState({
          id: res.data._id,
          title: res.data.title,
          description: res.data.description,
          category: res.data.category,
          location: res.data.location,
          price: res.data.price,
          email: res.data.email,
          isAuthor: true
        })
      })
      .catch((res) => { this.setState({ submitted: true }) })
  }

  onSubmit(e) {
    e.preventDefault()

    let body = {
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
      category: this.state.category,
      location: this.state.location,
      price: this.state.price,
      email: this.state.email,
      password: this.state.password
    }

    axios.put('/api/ad/update', body)
      .then(() => { this.setState({ submitted: true }) })
      .catch((err) => { console.log(err) })
  }

  onDelete(e) {
    e.preventDefault()

    let body = { params: { id: this.state.id } }

    axios.delete('/api/ad/destroy', body)
      .then(() => { this.setState({ submitted: true }) })
      .catch((err) => { console.log(err) })
  }

  render() {
    if (this.state.submitted) { return <Redirect to='/' /> }

    if (!this.state.isAuthor) {
      return (
        <div className='container'>
          <div className='row'>
            <div className='col-sm-9 mx-auto'>
              <div className='card card-signin my-5'>
                <div className='card-body'>
                  <h5 className='card-title text-center'>Enter password</h5>
                  <form className='form-signin' onSubmit={this.onPassSubmit} >
                    <label htmlFor='password' className='sr-only'>Password</label>
                    <input
                      type='password'
                      className='form-control'
                      placeholder='Password'
                      required
                      name='password'
                      onChange={this.onChange}
                    />
                    <br />

                    <button className='btn btn-lg btn-primary btn-block' type='submit'>
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (this.state.isAuthor) {
      return (
        <div className='container'>
          <div className='row'>
            <div className='col-sm-9 mx-auto'>
              <div className='card card-signin my-5'>
                <div className='card-body'>
                  <h5 className='card-title text-center'>Edit Ad</h5>
                  <form className='form-signin' onSubmit={this.onSubmit} encType='multipart/form-data' >
                    <label htmlFor='title' className='sr-only'>Title</label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Title'
                      required
                      name='title'
                      value={this.state.title}
                      onChange={this.onChange}
                    />
                    <br />

                    <label htmlFor='description' className='sr-only'>Description</label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Description'
                      required
                      name='description'
                      value={this.state.description}
                      onChange={this.onChange}
                    />
                    <br />

                    <select className='form-control' name='category' onChange={this.onChange} >
                      <option defaultValue value={this.state.category}>{this.state.category}</option>
                      {this.props.categories.map((cat) => {
                        return <option value={cat} key={cat}>{cat}</option>
                      })}
                    </select>
                    <br />

                    <select className='form-control' name='location' onChange={this.onChange} >
                      <option defaultValue value={this.state.location}>{this.state.location}</option>
                      {this.props.locations.map((loc) => {
                        return <option value={loc} key={loc}>{loc}</option>
                      })}
                    </select>
                    <br />

                    <label htmlFor='price' className='sr-only'>Price</label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Price'
                      required
                      name='price'
                      value={this.state.price}
                      onChange={this.onChange}
                    />
                    <br />

                    <label htmlFor='email' className='sr-only'>Email</label>
                    <input
                      type='email'
                      className='form-control'
                      placeholder='Email'
                      required
                      name='email'
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    <br />


                    <label htmlFor='password' className='sr-only'>Password</label>
                    <input
                      type='password'
                      className='form-control'
                      placeholder='Password'
                      required
                      name='password'
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    <br />

                    <button
                      className='btn btn-lg btn-primary btn-block'
                      type='submit'
                    >
                      Save ad
                    </button>
                  </form>

                  <br />

                  <form className='form-signin' onSubmit={this.onDelete} encType='multipart/form-data' >
                    <button
                      className='btn btn-lg btn-danger btn-block'
                      type='submit'
                    >
                      Delete ad
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default EditAd
