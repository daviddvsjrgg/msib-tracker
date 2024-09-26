import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-base-100">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0 xl:-ml-5 -ml-3">
                <div className="flex items-center">
                <Image 
                    src="https://firebasestorage.googleapis.com/v0/b/msib8-tracker.appspot.com/o/msib8-tracker-logo.png?alt=media&token=4317e835-2a7e-40c3-ac73-0f78096d3f61" 
                    className="me-2" 
                    alt="Logo"
                    width={70}
                    height={70}
                    priority
                    unoptimized
                />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MSIB Tracker App</span>
                </div>
            </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-3" />
        <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()} <a className="hover:underline">MSIB Tracker™</a>. Developed by David Dwiyanto.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
                <a href="https://instagram.com/davidjrggbro" target='_blank' className="text-gray-500 hover:scale-105 hover:text-gray-900 dark:hover:text-white ms-5 -mx-3">
                <svg xmlns="http://www.w3.org/2000/svg" className='size-5 dark:bg-white dark:rounded-md' stroke="white"  viewBox="0 0 50 50">
                    <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"></path>
                </svg>
                    <span className="sr-only">Instagram Account</span>
                </a>
                <a href="https://linkedin.com/in/davidcode" target='_blank' className="text-gray-500 hover:scale-105 hover:text-gray-900 dark:hover:text-white ms-5">
                <svg xmlns="http://www.w3.org/2000/svg" className='size-5 dark:bg-white dark:rounded-md' stroke="white" viewBox="0 0 50 50">
                    <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
                </svg>
                    <span className="sr-only">GitHub account</span>
                </a>
            </div>
        </div>
        </div>
    </footer>
  )
}

export default Footer