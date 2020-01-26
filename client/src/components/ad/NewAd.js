import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class NewAd extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      category: '',
      location: '',
      price: '',
      email: '',
      password: '',
      image: null,
      redirect: '',
      submitted: false
    }

    this.onChange = this.onChange.bind(this)
    this.onFileUpload = this.onFileUpload.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) { this.setState({ [e.target.name]: e.target.value }) }

  onFileUpload(e) { this.setState({ image: e.target.files[0] }) }

  onSubmit(e) {
    e.preventDefault()

    let formData = new FormData()
    formData.append('title', this.state.title)
    formData.append('description', this.state.description)
    formData.append('category', this.state.category)
    formData.append('location', this.state.location)
    formData.append('price', this.state.price)
    formData.append('email', this.state.email)
    formData.append('password', this.state.password)
    formData.append('file', this.state.image)

    axios.post('/api/ad/create', formData)
      .then((res) => {
        this.setState({
          redirect: `/ad/${res.data.id}`,
          submitted: true
        })
      })
      .catch((err) => { console.log(err) })
  }

  render() {
    if (this.state.submitted) { return <Redirect to={this.state.redirect} /> }

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-9 mx-auto'>
            <div className='card card-signin my-5'>
              <div className='card-body'>
                <h5 className='card-title text-center'>New Ad</h5>
                <form className='form-signin' onSubmit={this.onSubmit} encType='multipart/form-data' >
                  <label htmlFor='title' className='sr-only'>Title</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Title'
                    required
                    autoFocus
                    name='title'
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
                    onChange={this.onChange}
                  />
                  <br />

                  <label htmlFor='category' className='sr-only'>Category</label>
                  <select className='form-control' name='category' onChange={this.onChange}>
                    <option defaultValue value='all'>All categories</option>
                    { this.props.categories.map((cat) => {
                        return <option value={cat} key={cat}>{cat}</option>
                    }) }
                  </select>
                  <br />

                  <label htmlFor='location' className='sr-only'>Location</label>
                  <select className='form-control' name='location' onChange={this.onChange}>
                    <option defaultValue value='all'>Anywhere</option>
                    { this.props.locations.map((loc) => {
                        return <option value={loc} key={loc}>{loc}</option>
                    }) }
                  </select>
                  <br />

                  <label htmlFor='price' className='sr-only'>Price</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Price'
                    required
                    name='price'
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
                    onChange={this.onChange}
                  />
                  <br />

                  <input
                    type='file'
                    name='image'
                    accept='image/*'
                    required
                    onChange={this.onFileUpload}
                  />
                  <br /><br />

                  <button className='btn btn-lg btn-primary btn-block' type='submit'>
                    Create ad
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

export default NewAd
