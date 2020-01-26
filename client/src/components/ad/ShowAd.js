import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { BufferToBase64 } from '../../helpers/image_helpers.js'

class ShowAd extends Component {
  constructor(props) {
    super(props)
    this.state = { ad: {} }
  }

  componentDidMount() {
    axios.get(`/api/ad/show/${this.props.match.params.id}`)
      .then((res) => {
        if (res.data.image) { res.data.image = BufferToBase64(res.data.image.data) }
        this.setState({ ad: res.data })
      })
      .catch((err) => { console.log(err) })
  }

  render() {
    return (
      <div className='container'>
        <div className='col-sm-8 mx-auto'>
          <img className='card-img-top-new img-fluid' src={this.state.ad.image} alt='adImage' />
          <div className='card-body'>
            <h3 className='card-title'>{this.state.ad.title}</h3>
            <h4>{this.state.ad.price}</h4>
            <p className='card-text'>
              {this.state.ad.description}<br />
              {this.state.ad.views} views<br />
              Location: {this.state.ad.location}<br />
              Contact: {this.state.ad.email}<br />
              <small class="text-muted">
                <Link to={`${this.props.location.pathname}/edit`}>edit/delete</Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default ShowAd
