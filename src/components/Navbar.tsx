import Image from 'next/image'
import React from 'react'

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
                <li><a>saweria</a></li>
                <li><a>sociabuzz</a></li>
            </ul>
            </li>
            <li><a>Developed by David Dwiyanto</a></li>
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
                    <li><a>saweria</a></li>
                    <li><a>sociabuzz</a></li>
                </ul>
                </details>
            </li>
            <li><a>Developed by David Dwiyanto</a></li>
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
                    src="https://media.istockphoto.com/id/2004891062/photo/happy-mid-aged-business-woman-manager-handshaking-greeting-client-in-office.webp?b=1&s=612x612&w=0&k=20&c=ek3rg4EdqXf558uozPM8lhd_MYIfxAcSgvClWtw6u8U="
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
                Profile
                <span className="badge">New</span>
                </a>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
            </ul>
            
        </div>
    </div>
    </div>
    </>
  )
}

export default Navbar