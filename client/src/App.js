
import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import axios from 'axios'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import Home from './components/Home'
import IndexAd from './components/ad/IndexAd'
import ShowAd from './components/ad/ShowAd'
import NewAd from './components/ad/NewAd'
import EditAd from './components/ad/EditAd'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cats: [],
      locs: []
    }
  }

  componentDidMount() {
    axios.get('/api/constants')
      .then((res) => {
        this.setState({ 
          cats: res.data.categories,
          locs: res.data.locations
        })
      })
      .catch((err) => { console.log(err) })
  }

  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <Header />
          <Route
            exact path='/'
            component={() => <Home categories={this.state.cats} locations={this.state.locs} /> }
          />
          <Route 
            path='/search'
            component={IndexAd}
          />
          <Route
            sensetive path='/ads/:category'
            component={IndexAd}
          />
          <Route
            exact path='/ad/new'
            component={() => <NewAd categories={this.state.cats} locations={this.state.locs} /> } 
          />
          <Route
            exact path='/ad/:id/show'
            component={ShowAd}
          />
          <Route
            path='/ad/:id/edit'
            component={() => <EditAd categories={this.state.cats} locations={this.state.locs} /> }
          />
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
