import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import axios from 'axios'

import { BufferToBase64 } from '../../helpers/image_helpers.js'

class IndexAd extends Component {
  constructor(props) {
    super(props)
    this.state = { ads: [] }
  }

  componentDidMount() {
    let body = {}

    if (this.props.history.action === 'REPLACE') {
      const { category, location, title } = this.props.location.state
      if (category && category !== 'all') { body.category = category } 
      if (location && location !== 'all') { body.location = location }
      if (title) { body.title = title }
    }
    else {
      const { category } = this.props.match.params
      body.category = category
    }

    axios.post('/api/ad/index', body)
      .then((res) => {
        res.data.map((ad) => {
          if (ad.image) { ad.image = BufferToBase64(ad.image.data) }
          return ad
        })
        this.setState({ ads: res.data })
      })
      .catch((err) => { console.log(err) })
  }

  render() {
    if (this.state.ads.length < 0) {
      return <Redirect to='/' />
    }

    return (
      <div className='album py-5 bg-light'>
        <div className='container'>
          <div className='row'>
            {this.state.ads.map(ad => (
              <div className='col-md-4' key={ad._id}>
                <div className='card mb-4 shadow-sm'>
                  <Link to={`/ad/${ad._id}`}className='card-img-top-new'>
                    <img src={ad.image} alt='adImage' className='card-img-top-new img-fluid' />
                  </Link>
                  <div className='card-body'>
                    <h5>{ad.title}</h5>
                    <br />

                    <p className='card-text'>
                      {ad.description}
                      <br />
                      {ad.price}
                      <br />
                      {ad.location}
                    </p>

                    <div className='d-flex justify-content-between align-ads-center'>
                      <div className='btn-group'>
                        <Link to={`/ad/${ad._id}`} className='btn btn-sm btn-outline-secondary'>
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default IndexAd
