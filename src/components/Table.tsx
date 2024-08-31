'use client'

import React, { useState } from 'react'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const dummyData = [
    { id: "1", name: 'Item 1' },
    { id: "2", name: 'Item 2' },
    { id: "3", name: 'Item 3' },
    { id: "4", name: 'Item 3' },
    { id: "5", name: 'Item 3' },
    { id: "6", name: 'Item 3' },
    { id: "7", name: 'Item 3' },
    { id: "8", name: 'Item 3' },
    { id: "9", name: 'Item 3' },
    { id: "10", name: 'Item 3' },
    { id: "11", name: 'Item 3' },
    { id: "12", name: 'Item 3' },
    { id: "13", name: 'Item 3' },
    { id: "14", name: 'Item 3' },
]

const Table = () => {
  
  // Column City
  const [activeColCity, setActiveColCity] = useState<string | null>(null);

  const handleToggleColCity = (id: string) => {
    setActiveColCity(activeColCity === id ? null : id);
  };

//   // Column Progress
  const [activeColProgress, setActiveColProgress] = useState<string | null>(null);

  const handleToggleColProgress = (id: string) => {
    setActiveColProgress(activeColProgress === id ? null : id);
  };

  return (
    <div className="card bg-base-100 w-auto shadow-xl m-8">
      <div className="card-body">
        <div className="inline-flex">
          <h2 className="card-title">List Perusahaan</h2>
          <div className="text-xl badge badge-ghost my-1">0/22</div>
        </div>
        <div className="overflow-x-auto">   
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Perusahaan</th>
                <th>Jenis</th>
                <th>Lokasi Kota</th>
                <th>Kemajuan</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            {/* body */}
            {dummyData.map((p, index) => (
              <tbody key={p.id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="font-bold">Hart Hagerty</div>
                    </div>
                  </td>
                  <td>
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          Opsi
                          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                        </MenuButton>
                      </div>
                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                      >
                        <div className="py-1">
                          <MenuItem>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Studi Independen
                            </a>
                          </MenuItem>
                          <MenuItem>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Magang
                            </a>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                  </td>
                  <td>
                    <div className='inline-flex'>
                      {activeColCity === p.id ? (
                        <input
                          type="text"
                          placeholder="Type here"
                          className="input input-bordered hover:border-black w-full max-w-xs"
                        />
                      ) : (
                        <p>Surabaya</p>
                      )}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="ml-3 hover:scale-150 hover:bg-gray-100 p-1 hover:rounded-md hover:cursor-pointer duration-150 size-7 -mt-1"
                        onClick={() => handleToggleColCity(p.id)} // Toggle visibility on click
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487z"
                        />
                      </svg>
                    </div>
                  </td>
                  <td>
                    <div className='inline-flex'>
                        {activeColProgress === p.id ? (
                            <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered hover:border-black w-full max-w-xs"
                            />
                        ) : (
                            <p>Test TPA</p>
                        )}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="ml-3 hover:scale-150 hover:bg-gray-100 p-1 hover:rounded-md hover:cursor-pointer duration-150 size-7 -mt-1"
                        onClick={() => handleToggleColProgress(p.id)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487z"
                        />
                      </svg>
                    </div>
                  </td>
                  <td>
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          Opsi
                          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                        </MenuButton>
                      </div>
                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                      >
                        <div className="py-1">
                          <MenuItem>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Diterima
                            </a>
                          </MenuItem>
                          <MenuItem>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Diproses
                            </a>
                          </MenuItem>
                          <MenuItem>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Belum Lolos
                            </a>
                          </MenuItem>
                          <MenuItem>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Ghosting ini, Fix!
                            </a>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              </tbody>
            ))}
            {/* foot */}
            <tfoot>
              <tr>
                <th>No</th>
                <th>Nama Perusahaan</th>
                <th>Jenis</th>
                <th>Lokasi Kota</th>
                <th>Kemajuan</th>
                <th>Status</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Table
