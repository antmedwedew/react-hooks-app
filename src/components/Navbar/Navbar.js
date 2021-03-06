import React from 'react'
import { NavLink } from 'react-router-dom'


export const Navbar = () => (
  <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
     <NavLink to='/' className="navbar-brand">Github поиск</NavLink>
      <ul className='navbar-nav'>
        <li className='nav-item'>
          <NavLink exact to='/' className="nav-link">Главная</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to='/About' className="nav-link">Информация</NavLink>
        </li>
      </ul>
  </nav>
)