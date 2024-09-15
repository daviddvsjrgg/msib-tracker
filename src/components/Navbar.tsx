import Image from 'next/image'
import React from 'react'

let linkSaweria = "https://saweria.co/davidcode";

const Navbar = () => {
  return (
    <>
    <div className="navbar bg-base-100">
    <div className="flex-1">
    {/* Item (Mobile) */}
        <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
        </div>
        <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
            <a>Support Dev</a>
            <ul className="p-2">
                <li><a href='https://saweria.co/davidcode' target='_blank'>saweria</a></li>
            </ul>
            </li>
            {/* <li><a>Item 3</a></li> */}
        </ul>
        </div>
    {/* End Item (Mobile) */}
        <a className="btn btn-ghost text-xl">MSIB Tracker</a>
    </div>
    <div className="flex-none gap-2">
        {/* Item */}
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
            <li>
                <details>
                <summary>Support Dev</summary>
                <ul className="p-2 z-50">
                    <li><a href={`${linkSaweria}`} target='_blank'>saweria</a></li>
                </ul>
                </details>
            </li>
            {/* <li><a>Item 3</a></li> */}
            </ul>
        </div>
        {/* End Item */}
        {/* <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        </div> */}
        <div className="dropdown dropdown-end">
            
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                <Image
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                    alt="Tailwind CSS Navbar component"
                    src="https://images.unsplash.com/photo-1598935888738-cd2622bcd437?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width={180}
                    height={37}
                    priority
                    unoptimized
                    />
                </div>
            </div>
            
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                    <a className="justify-between">
                        Profile (anonymous)
                    </a>
                </li>
                <li>
                    <a>Login (soon)</a>
                </li>
                <li><a className='text-gray-500'>Note: Data kamu akan otomatis terhapus dalam 30 hari/saat menghapus cache browser ini, login untuk menyimpan data kakak :D</a></li>
            </ul>
            
        </div>
    </div>
    </div>
    </>
  )
}

export default Navbar