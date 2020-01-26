import React from 'react'
import { Link } from 'react-router-dom'

import SearchBar from '../components/SearchBar'

const Home = (props) => {
  return (
    <>
      <SearchBar categories={props.categories} locations={props.locations} />
      <ul className='list-group'>
        {props.categories.map((cat) => {
          return (
            <Link to={`/ads/${cat}`} key={cat}>
              <li className='list-group-item'>{cat}</li>
            </Link>
          )
        })}
      </ul>
    </>
  )
}

export default Home
