import React from 'react'

const Dropdown = () => {
  return (
    <div className='dropdown'>
        <button className="trigger">Dropdown</button>
        <ul className='dropdown-items'>
            <li className='dropdown-item'>Dropdown item 1</li>
        </ul>
    </div>
  )
}

export default Dropdown