import React from 'react'

function Header({ name }) {
  return (
    <header className="h-16 bg-white flex">
      <button
        className="h-16 p-3 w-64 flex items-center justify-start"
        style={{ backgroundColor: '#001944' }}
      >
        <span className="leading-loose text-xl ml-2 text-white">LOGO</span>
      </button>
      <div className="flex flex-grow items-center justify-between p-3 pl-6 pr-6 ">
        <div className="flex items-center justify-end h-full">
          <button className="h-full rounded  pl-2 pr-2 flex items-center justify-end">
            <span className="ml-2 text-xl">{name}</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
