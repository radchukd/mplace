import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => (
  <footer className='page-footer font-small mt-2 text-center'>
    2020 Mplace
    <ul className='list-inline'>
  <li className='list-inline-item'>
    <Link to='/' className='nav-link'>FAQ</Link>
  </li>
  <li className='list-inline-item'>
    <Link to='/' className='nav-link'>Contact</Link>
  </li>
  <li className='list-inline-item'>
    <Link to='/' className='nav-link'>RSS</Link>
  </li>
</ul>
  </footer>
)

export default Footer