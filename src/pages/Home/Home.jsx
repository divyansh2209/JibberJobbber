import React from 'react'
import Chat from '../../components/Chat';
import Sidebar from './../../components/sidebar';
import "./home.scss"

const Home = () => {
  return (
    <div className='home'>
        <div className='container'>
            <Sidebar/>
            <Chat/>
        </div>
    </div>
  )
}

export default Home