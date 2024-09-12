'use client'

import React, { useEffect, useState } from 'react'
import { authenticateAndSave } from '@/api/account/authenticateAndSave';

const dummyData = [
    { id: "1", name: 'Item 1' },
    { id: "2", name: 'Item 2' },
    { id: "3", name: 'Item 3' },
    { id: "4", name: 'Item 3' },
    // { id: "5", name: 'Item 3' },
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
  
  // Create Anonymous 
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await authenticateAndSave();
      } catch (error) {
        console.error('Error initializing authentication and saving data:', error);
      }
    };

    initializeAuth();
  }, []);

  // Column City
  const [activeColCompany, setActiveColCompany] = useState<string | null>(null);

  const handleToggleColCompany = (id: string) => {
    setActiveColCompany(activeColCompany === id ? null : id);
  };

  // Column City
  const [activeColCity, setActiveColCity] = useState<string | null>(null);``

  const handleToggleColCity = (id: string) => {
    setActiveColCity(activeColCity === id ? null : id);
  };

  // Column Progress
  const [activeColProgress, setActiveColProgress] = useState<string | null>(null);

  const handleToggleColProgress = (id: string) => {
    setActiveColProgress(activeColProgress === id ? null : id);
  };

  return (
    <>
    {/* Modal Detail */}
    {/* You can open the modal using document.getElementById('ID').showModal() method */}
    <dialog id="detailModal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">Detail ~PERUSAHAAN~</h3>
        <div className="divider divider-info"></div>
        <div className='columns-3'>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Lokasi</span>
          </div>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Instagram</span>
          </div>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Batch</span>
          </div>
          <input disabled type="text" placeholder="7" value="8" className="input input-bordered w-full max-w-xs" />
        </label>
        </div>
        <label className="form-control mt-3">
          <div className="label">
            <span className="label-text">Note Khusus</span>
          </div>
          <textarea className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
          <div className="label">
          </div>
        </label>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
    {/* Modal Add */}
    {/* You can open the modal using document.getElementById('ID').showModal() method */}
    <dialog id="addModal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">Tambah List Perusahaan</h3>
        <div className="divider divider-info"></div>
        <div className='column-4'>
        <label className="w-auto">
          <div className="label">
            <span className="label-text">Nama Perusahaan</span>
          </div>
          <input type="text" placeholder="Type here" className="input input-bordered w-full" />
        </label>
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button className="btn mx-2">Batal</button>
            <button className="btn btn-info hover:text-gray-800 text-white ">Tambahkan</button>
          </form>
        </div>
      </div>
    </dialog>
    <div className="
      md:card md:mx-5 md:my-6 
      mx-0 my-0
      bg-base-100 w-auto shadow-xl"
      >
      <div className="card-body">
        <div className="text-xl badge badge-ghost p-3">0/22</div>
        <div className="inline-flex">
          <h2 className="card-title ml-1">List Perusahaan</h2>
          <button className="btn btn-sm ml-2 hover:scale-105 duration-150"
          onClick={() => (document.getElementById('addModal') as HTMLDialogElement)?.showModal()}>
            Tambah
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
            </svg>
          </button>
        </div>
        <div className="overflow-x-auto">   
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Perusahaan</th>
                <th>Jenis</th>
                <th>Posisi</th>
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
                  <tr className='hover:bg-gray-100/65'>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        {activeColCompany === items.id ? (
                          <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered input-sm hover:border-black w-full max-w-xs"
                          />
                        ) : (
                          <div className="font-bold">Hart Hagerty</div>
                        )}
                        {activeColCompany === items.id ? (
                           <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="green"
                            className="scale-125 hover:scale-150 hover:bg-gray-200 p-1 hover:rounded-md hover:cursor-pointer duration-150 size-7 -mt-1"
                            onClick={() => handleToggleColCompany(items.id)}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="hover:scale-150 hover:bg-gray-200 p-1 hover:rounded-md hover:cursor-pointer duration-150 size-7 -mt-2"
                            onClick={() => handleToggleColCompany(items.id)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487z"
                            />
                          </svg>
                        )}
                      </div>
                    </td>
                    <td>
                    {isItFirstRow ? (
                        <>
                          <div className="dropdown inline-flex mr-2">
                              <div tabIndex={0} role="button" className="btn btn-sm">
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
                          <div className="dropdown dropdown-right dropdown-end inline-flex mr-2">
                            <div tabIndex={0} role="button" className="btn btn-sm">
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
                          <div className="dropdown inline-flex mr-2">
                            <div tabIndex={0} role="button" className="btn btn-sm">
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
                            className="input input-bordered input-sm hover:border-black w-full max-w-xs"
                          />
                        ) : (
                          <p>Fullstack Developer</p>
                        )}
                        {activeColCity === items.id ? (
                           <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="green"
                            className="ml-3 scale-125 hover:scale-150 hover:bg-gray-200 p-1 hover:rounded-md hover:cursor-pointer duration-150 size-7 -mt-1.6"
                            onClick={() => handleToggleColCity(items.id)}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="ml-3 hover:scale-150 hover:bg-gray-200 p-1 hover:rounded-md hover:cursor-pointer duration-150 size-7 -mt-2"
                            onClick={() => handleToggleColCity(items.id)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487z"
                            />
                          </svg>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className='inline-flex'>
                          {activeColProgress === items.id ? (
                              <input
                              type="text"
                              placeholder="Type here"
                              className="input input-bordered input-sm hover:border-black w-full max-w-xs"
                              />
                          ) : (
                              <p>Test TPA</p>
                          )}
                          {activeColProgress === items.id ? (
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" viewBox="0 0 24 24" 
                                strokeWidth={1.5} 
                                stroke="green"
                                className="ml-3 scale-125 hover:scale-150 hover:bg-gray-200 p-1 hover:rounded-md hover:cursor-pointer duration-150 size-7 -mt-1.6"
                                onClick={() => handleToggleColProgress(items.id)}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                              </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="ml-3 hover:scale-150 hover:bg-gray-200 p-1 hover:rounded-md hover:cursor-pointer duration-150 size-7 -mt-1"
                              onClick={() => handleToggleColProgress(items.id)}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487z"
                              />
                            </svg>
                          )}
                      </div>
                    </td>
                    <td>
                    {isItFirstRow ? (
                      <>
                        <div className="dropdown inline-flex mr-2">
                          <div tabIndex={0} role="button" className="btn btn-sm">
                            Opsi
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                          </div>
                          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><a>Diterima</a></li>
                            <li><a>Diproses</a></li>
                            <li><a>Terdaftar</a></li>
                            <li><a>Di Ghosting</a></li>
                          </ul>
                        </div>
                      </>
                    ) : isItLastRow || isItLastSecondRow ? (
                      <>
                        <div className="dropdown dropdown-left dropdown-end inline-flex mr-2">
                          <div tabIndex={0} role="button" className="btn btn-sm">
                            Opsi
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                              </svg>
                          </div>
                          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                              <li><a>Diterima</a></li>
                              <li><a>Diproses</a></li>
                              <li><a>Terdaftar</a></li>
                              <li><a>Di Ghosting</a></li>
                          </ul>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="dropdown inline-flex mr-2">
                          <div tabIndex={0} role="button" className="btn btn-sm">
                            Opsi
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                          </div>
                          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><a>Diterima</a></li>
                            <li><a>Diproses</a></li>
                            <li><a>Terdaftar</a></li>
                            <li><a>Di Ghosting</a></li>
                          </ul>
                        </div>
                      </>
                    )}
                    
                    </td>
                    <th>
                      <div className='inline-flex'>
                        <button 
                          className="btn btn-ghost btn-xs" 
                          onClick={() => (document.getElementById('detailModal') as HTMLDialogElement)?.showModal()}>
                          detail
                        </button>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          strokeWidth={1.5} 
                          stroke="red" 
                          className="scale-110 hover:scale-100 hover:bg-gray-200 hover:rounded-md hover:cursor-pointer duration-150 size-6 p-1"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </div>
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
                <th>Posisi</th>
                <th>Kemajuan</th>
                <th>Status</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
    </>
  )
}

export default Table
