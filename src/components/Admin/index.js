import React from 'react'
import Navi from './Navi';
import { Outlet } from 'react-router-dom';
import './index.scss';
export default function Admin() {
  
  return (
    <div className='admin'>
      <div className='navi'>
        <Navi />
      </div>
      <div className='workspace'>
        <Outlet />
      </div>
    </div>
  )
}
