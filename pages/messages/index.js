import React from 'react'
import Friends from '../../components/Messages/Friends'
import Navbar from '../../components/Navbar'

const messages = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <section id="messages" className='flex-grow'>
        <div className='w-96 p-3 shadow-lg h-full'>
          <Friends />
        </div>
      </section>
    </div>
  )
}

export default messages