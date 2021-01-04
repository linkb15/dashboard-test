import React from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'

function NavLink({ svg, label = 'Label', href = '#', router }) {
  const { pathname } = router

  return (
    <Link href={href}>
      <a
        className={
          'mt-4 flex items-center hover:bg-blue-900 px-3 py-2 rounded focus:bg-blue-900 ' +
          (pathname === href ? 'bg-blue-900' : '')
        }
      >
        {svg}
        <span> {label} </span>
      </a>
    </Link>
  )
}

const LinkAction = withRouter(NavLink)

function Sidebar() {
  return (
    <nav
      className="flex flex-col text-white h-full w-64 flex-shrink-0 py-4 px-1"
      style={{ backgroundColor: '#001944' }}
    >
      <LinkAction
        href="/dashboard"
        svg={
          <svg
            className="fill-current text-blue-200 w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              className="heroicon-ui"
              d="M13 20v-5h-2v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-7.59l-.3.3a1 1 0 11-1.4-1.42l9-9a1 1 0 011.4 0l9 9a1 1 0 01-1.4 1.42l-.3-.3V20a2 2 0 01-2 2h-3a2 2 0 01-2-2zm5 0v-9.59l-6-6-6 6V20h3v-5c0-1.1.9-2 2-2h2a2 2 0 012 2v5h3z"
            />
          </svg>
        }
        label="Dashboard"
      />

      <LinkAction
        href="/dashboard/package"
        svg={
          <svg
            className="fill-current text-blue-200 w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              className="heroicon-ui"
              d="M6 14H4a2 2 0 01-2-2V4c0-1.1.9-2 2-2h12a2 2 0 012 2v2h2a2 2 0 012 2v13a1 1 0 01-1.7.7L16.58 18H8a2 2 0 01-2-2v-2zm0-2V8c0-1.1.9-2 2-2h8V4H4v8h2zm14-4H8v8h9a1 1 0 01.7.3l2.3 2.29V8z"
            />
          </svg>
        }
        label="Package"
      />

      <LinkAction
        href="/dashboard/address"
        svg={
          <svg
            className="fill-current text-blue-200 w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              className="heroicon-ui"
              d="M11.03 8h3.94l1.06-4.24a1 1 0 111.94.48L17.03 8H20a1 1 0 010 2h-3.47l-1 4H18a1 1 0 110 2h-2.97l-1.06 4.25a1 1 0 11-1.94-.49l.94-3.76H9.03l-1.06 4.25a1 1 0 11-1.94-.49L6.97 16H4a1 1 0 010-2h3.47l1-4H6a1 1 0 010-2h2.97l1.06-4.24a1 1 0 111.94.48L11.03 8zm-.5 2l-1 4h3.94l1-4h-3.94z"
            />
          </svg>
        }
        label="Address"
      />
    </nav>
  )
}

export default Sidebar
