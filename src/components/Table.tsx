'use client'

import React, { useState } from 'react'

const dummyData = [
    { id: "1", name: 'Item 1' },
    { id: "2", name: 'Item 2' },
    { id: "3", name: 'Item 3' },
    { id: "4", name: 'Item 3' },
    { id: "5", name: 'Item 3' },
    // { id: "6", name: 'Item 3' },
    // { id: "7", name: 'Item 3' },
    // { id: "8", name: 'Item 3' },
    // { id: "9", name: 'Item 3' },
    // { id: "10", name: 'Item 3' },
    // { id: "11", name: 'Item 3' },
    // { id: "12", name: 'Item 3' },
    // { id: "13", name: 'Item 3' },
    // { id: "14", name: 'Item 3' },
    // { id: "15", name: 'Item 3' },
    // { id: "16", name: 'Item 3' },
    // { id: "17", name: 'Item 3' },
    // { id: "18", name: 'Item 3' },
    // { id: "19", name: 'Item 3' },
    // { id: "20", name: 'Item 3' },
    // { id: "21", name: 'Item 3' },
    // { id: "22", name: 'Item 3' },
]

const Table = () => {
  
  // Column City
  const [activeColCity, setActiveColCity] = useState<string | null>(null);

  const handleToggleColCity = (id: string) => {
    setActiveColCity(activeColCity === id ? null : id);
  };

  // Column Progress
  const [activeColProgress, setActiveColProgress] = useState<string | null>(null);

  const handleToggleColProgress = (id: string) => {
    setActiveColProgress(activeColProgress === id ? null : id);
  };

  return (
    <div className="
      md:card md:mx-5 md:my-6 
      mx-0 my-0
      bg-base-100 w-auto shadow-xl"
      >
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
            {dummyData.map((items, index) => {
              const isItFirstRow = index === 0;
              const isItLastRow = index === dummyData.length - 1;
              const isItLastSecondRow = index === dummyData.length - 2;

              return (
              <>
                <tbody key={items.id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="font-bold">Hart Hagerty</div>
                      </div>
                    </td>
                    <td>
                    {isItFirstRow ? (
                        <>
                          <div className="dropdown">
                              <div tabIndex={0} role="button" className="btn m-1">
                                Opsi
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                              </div>
                              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a>Studi Independen</a></li>
                                <li><a>Magang</a></li>
                              </ul>
                            </div>  
                        </>
                      ) : isItLastRow || isItLastSecondRow ?(
                        <>
                          <div className="dropdown dropdown-right dropdown-end">
                            <div tabIndex={0} role="button" className="btn m-1">
                              Opsi
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                              </svg>
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                              <li><a>Studi Independen</a></li>
                              <li><a>Magang</a></li>
                            </ul>
                          </div> 
                        </>
                      ) : (
                        <>
                          <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn m-1">
                              Opsi
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                              </svg>
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                              <li><a>Studi Independen</a></li>
                              <li><a>Magang</a></li>
                            </ul>
                          </div>  
                        </>
                      )}
                    </td>
                    <td>
                      <div className='inline-flex'>
                        {activeColCity === items.id ? (
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
                          onClick={() => handleToggleColCity(items.id)} // Toggle visibility on click
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
                          {activeColProgress === items.id ? (
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
                          onClick={() => handleToggleColProgress(items.id)}
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
                    {isItFirstRow ? (
                      <>
                        <div className="dropdown">
                          <div tabIndex={0} role="button" className="btn m-1">
                            Opsi
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                          </div>
                          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><a>Diterima</a></li>
                            <li><a>Diproses</a></li>
                            <li><a>Terdaftar</a></li>
                            <li><a>Tidak Lolos</a></li>
                          </ul>
                        </div>
                      </>
                    ) : isItLastRow || isItLastSecondRow ? (
                      <>
                        <div className="dropdown dropdown-left dropdown-end">
                          <div tabIndex={0} role="button" className="btn m-1">
                            Opsi
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                              </svg>
                          </div>
                          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                              <li><a>Diterima</a></li>
                              <li><a>Diproses</a></li>
                              <li><a>Terdaftar</a></li>
                              <li><a>Tidak Lolos</a></li>
                          </ul>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="dropdown">
                          <div tabIndex={0} role="button" className="btn m-1">
                            Opsi
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                          </div>
                          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><a>Diterima</a></li>
                            <li><a>Diproses</a></li>
                            <li><a>Terdaftar</a></li>
                            <li><a>Tidak Lolos</a></li>
                          </ul>
                        </div>
                      </>
                    )}
                    
                    </td>
                    <th>
                      <button className="btn btn-ghost btn-xs">detail</button>
                    </th>
                  </tr>
                </tbody>
              </>
              )
            })}
            {/* foot */}
            <tfoot className={`${dummyData.length >= 3 ? '' : 'h-56'}`}>
              <tr className={`${dummyData.length >= 3 ? '' : 'hidden'}`}>
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
