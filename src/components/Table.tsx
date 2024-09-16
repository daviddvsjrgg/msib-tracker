'use client'

import React, { useEffect, useState } from 'react'
import { authenticateAndSave } from '@/api/account/authenticateAndSave';
import { addData } from '@/api/usersTable/addData/addData';
import { onValue, ref} from 'firebase/database';
import { db } from '@/config/firebase';
import { updateInput, updateOption } from '@/api/usersTable/editData/editData';
import { deleteItem } from '@/api/usersTable/deleteData/deleteData';

interface TableData {
  rowId: string,
  tableId: string,
  status: string,
  lokasi: string,
  nama_kegiatan: string,
  deskripsi: string,
  name_ref_kegiatan: string,
  mitra_logo: string,
  mitra_brand_name: string,
  semester_program: string,
  cycle: string,
  progress: string,
  createdAt: string,
  updatedAt: string,
}

const Table: React.FC = () => {
  
  // Create or Check Authentication 
  const [userId, setUserId] = useState<string | null>(null);
  const [tableId, setTableId] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const result = await authenticateAndSave();
        if (result) {
          setUserId(result.userId);  // Set userId
          setTableId(result.tableId);  // Set tableId
        }
      } catch (error) {
        console.error('Error initializing authentication and saving data:', error);
      }
    };
  
    initializeAuth();
  }, []);

  // DB Column Change
  const [dbBrandColumn, setDbBrandColumn] = useState<string | null>('')
  const [dbPositionColumn, setDbPositionColumn] = useState<string | null>('')
  const [dbProgressColumn, setDbProgressColumn] = useState<string | null>('')

  // Column City
  const [activeColCompany, setActiveColCompany] = useState<string | null>(null);

  const handleToggleColCompany = (id: string, brandColumn: string) => {
    setDbBrandColumn(brandColumn)
    setActiveColCompany(activeColCompany === id ? null : id);
  };

  // Column City
  const [activeColPosition, setActiveColPosition] = useState<string | null>(null);

  const handleToggleColPosition = (id: string, dbPositionColumn: string) => {
    setDbPositionColumn(dbPositionColumn)
    setActiveColPosition(activeColPosition === id ? null : id);
  };

  // Column Progress
  const [activeColProgress, setActiveColProgress] = useState<string | null>(null);

  const handleToggleColProgress = (id: string, dbProgressColumn: string) => {
    setDbProgressColumn(dbProgressColumn)
    setActiveColProgress(activeColProgress === id ? null : id);
  };

  // Add Company
  const [namaPerusahaan, setNamaPerusahaan] = useState<string>('');
  const [namaPerusahaanIsEmpty, setNamaPerusahaanIsEmpty] = useState<boolean>(false);
  
  // Tambahkan Button
  const [addButton, setAddButton] = useState<boolean>(false);
  
  const handleTambahPerusahaan = async () => {
    if (namaPerusahaan !== "" && tableId && userId) {
      try {
        setAddButton(true)
        await addData(userId, tableId, namaPerusahaan);
        setNamaPerusahaan(''); // Clear the input after saving
        setNamaPerusahaanIsEmpty(false); // Reset validation flag
        setAddButton(false)
      } catch (error) {
        console.error('Error adding data:', error);
      }
      setNamaPerusahaan('')
    } else {
      setNamaPerusahaanIsEmpty(true)
    }
  }

  // Fetch Table
  const [data, setData] = useState<TableData[]>([]);

  useEffect(() => {
    if (userId) {
      const dbRef = ref(db, `users/${userId}/table`);
  
      // Fetch data in real-time
      const unsubscribe = onValue(dbRef, (snapshot) => {
        const fetchedData: TableData[] = [];
        snapshot.forEach((childSnapshot) => {
          const item = childSnapshot.val() as TableData; // Cast the snapshot value to TableData
          fetchedData.push(item);
        });
  
        // Sort the fetchedData by createdAt in descending order (newest first)
        const sortedData = fetchedData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
        // Set the state with the sorted data
        setData(sortedData);
      });
  
      // Cleanup subscription on unmount
      return () => unsubscribe();
    }
  }, [userId]);

  // Edit Option
  const handleOptionSelect = async (option: string, rowId: string, column: string) => {
    if (option && userId && rowId && column) {
      try {
        await updateOption(option, userId, rowId, column);  // Update the option in Firebase
      } catch (error) {
        console.error('Error updating type:', error);
      }
    } else {
      console.error('UserId is not defined');
    }
  };

  // Edit Brand Input
  const handleUpdateInputBrand = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const brandValue = e.target.value
    if (userId && activeColCompany && dbBrandColumn) {
      updateInput(brandValue, userId, activeColCompany, dbBrandColumn);
    }
  };

  // Edit Position Input
  const handleUpdateInputPosition = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const positionValue = e.target.value
    if (userId && activeColPosition && dbPositionColumn) {
      updateInput(positionValue, userId, activeColPosition, dbPositionColumn);
    }
  };

  // Edit progress Input
  const handleUpdateInputProgress = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const progressValue = e.target.value
    if (userId && activeColProgress && dbProgressColumn) {
      updateInput(progressValue, userId, activeColProgress, dbProgressColumn);
    }
  };

  // Delete Row Data
  const [rowIdToDelete, setRowIdToDelete] = useState<string | null>('')
  const [brandToDelete, setBrandToDelete] = useState<string | null>('')

  const handleDeleteRowData = async (rowId: string, brandToDelete: string) => {
    setRowIdToDelete(rowId)
    setBrandToDelete(brandToDelete)
  }

  // Mode
  const [modeView, setModeView] = useState('');
  
  // Effect to initialize state from localStorage on component mount
  useEffect(() => {
    const savedModeView = localStorage.getItem('modeView');
    if (savedModeView) {
      setModeView(savedModeView);
    }
  }, []);

  // Sorting
  const [sortType, setSortType] = useState("");
  const [sortStatus, setStatus] = useState("");

  return (
    <>
    {/* Modal Detail */}
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
            <span className="label-text">Media Sosial Perusahaan</span>
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
    <dialog id="addModal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">Tambah List Perusahaan</h3>
        <div className="divider divider-info"></div>
        <div className='column-4'>
        <label className="w-auto">
          <div className="label">
            <span className="label-text">Nama Perusahaan</span>
          </div>
          <input type="text" placeholder="Type here"
            value={namaPerusahaan}
            onChange={(e) => {
              setNamaPerusahaanIsEmpty(false)
              setNamaPerusahaan(e.target.value)
            }}
            className={`input input-bordered w-full ${namaPerusahaanIsEmpty ? "input-error" : ""}`} />
            {namaPerusahaanIsEmpty && (
              <>
                <p className='text-sm text-red-600 mt-1'>Hah kosong kak? Isi dulu dong, nama perusahaan apa gitu :D</p>
              </>
            )}
        </label>
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button className="btn mx-2">Tutup</button>
            {addButton ? (
              <>
                <a className="btn btn-info hover:text-gray-800 text-white ">
                  Tambahkan
                  <span className="loading loading-spinner"></span>
                </a>
              </>
            ) : (
              <>
              {data.length >= 22 ? (
                <>
                  <a className="btn btn-info hover:text-gray-800 text-white">
                    Udah ngga bisa tambah lagi kak :D
                  </a>
                </>
              ) : (
                <>
                  <a onClick={handleTambahPerusahaan} className="btn btn-info hover:text-gray-800 text-white ">
                    Tambahkan
                  </a>
                </>
              )}
              </>
            )}
          </form>
        </div>
      </div>
    </dialog>
    {/* Modal Delete Row */}
    {/* Put this part before </body> tag */}
    <dialog id="deleteModal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg flex">Apa yakin menghapus List: <p className='text-sky-600 ml-2'>{brandToDelete}</p>?</h3>
        <p className="py-4">ang ang ang</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn mx-2">Close</button>
            <a className="btn bg-red-500 text-white hover:bg-red-600"
            onClick={() => {
              const modal = document.getElementById('deleteModal') as HTMLDialogElement;
              modal.close();
              if (rowIdToDelete && userId) {
                deleteItem(rowIdToDelete, userId)
              }
            }}>Hapus</a>
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
        <div className={`text-xl badge badge-ghost p-3 ${data.length !== 0 ? "" : "animate-pulse"}`}>{data.length !== 0 ? data.length : "0"}/22</div>
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
          <div className='mt-2'>
          <div className="dropdown">
            <div tabIndex={0} role="button" className={`btn btn-xs bg-white border-gray-400`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
              Mode
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 hidden xl:block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li onClick={() => {
                localStorage.setItem('modeView', "edit")
                setModeView("edit")
              }}
              className={`mt-1 ${modeView === "edit" ? "bg-gray-200 rounded-md" : ""}`}>
                <div className='justify-between'>
                  <a>
                    Edit
                  </a>
                  {modeView === "edit" && (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </>
                  )}
                </div>
              </li>
              <li onClick={() => {
                localStorage.setItem('modeView', "view")
                setModeView("view")
              }} 
                    className={`mt-1 ${modeView === "view" ? "bg-gray-200 rounded-md" : ""}`}>
                <div className='justify-between'>
                  <a>
                    Lihat Doang
                  </a>
                  {modeView === "view" && (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </>
                  )}
                </div>
              </li>
            </ul>
          </div> 
          <div className="dropdown mx-2">
            <div tabIndex={0} role="button" className={`btn btn-xs bg-white border-gray-400`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
              Jenis
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 hidden xl:block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li className={`mt-1 ${sortType === "Studi Independen" ? "bg-gray-200 rounded-md" : ""}`} onClick={() => {
                const sortedData = [...data].sort((a, b) => {
                  // Custom sorting logic based on the "name" property
                  if (a.name_ref_kegiatan === 'Studi Independen' && b.name_ref_kegiatan !== 'Studi Independen') {
                    return -1;
                  } else if (a.name_ref_kegiatan !== 'Studi Independen' && b.name_ref_kegiatan === 'Studi Independen') {
                    return 1;
                  }
                  return 0; // No change in order if names are the same
                });
                
                setStatus("")
                setData(sortedData);
                setSortType("Studi Independen")
              }}>
                <div className='justify-between'>
                  <a>
                    Studi Independen
                  </a>
                  {sortType === "Studi Independen" && (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </>
                  )}
                </div>
              </li>
              <li className={`mt-1 ${sortType === "Magang" ? "bg-gray-200 rounded-md" : ""}`} onClick={() => {
                const sortedData = [...data].sort((a, b) => {
                  // Custom sorting logic based on the "name" property
                  if (a.name_ref_kegiatan === 'Magang' && b.name_ref_kegiatan !== 'Magang') {
                    return -1;
                  } else if (a.name_ref_kegiatan !== 'Magang' && b.name_ref_kegiatan === 'Magang') {
                    return 1;
                  }
                  return 0; // No change in order if names are the same
                });
                
                setStatus("")
                setData(sortedData);
                setSortType("Magang")
              }}>
              <div className='justify-between'>
                  <a>
                    Magang
                  </a>
                  {sortType === "Magang" && (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </>
                  )}
                </div>
              </li>
            </ul>
          </div> 
          <div className="dropdown">
            <div tabIndex={0} role="button" className={`btn btn-xs bg-white border-gray-400`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
            </svg>
              Status
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 hidden xl:block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li className={`mt-1 ${sortStatus === "Diterima" ? "bg-gray-200 rounded-md" : ""}`} onClick={() => {
                const sortedData = [...data].sort((a, b) => {
                  // Custom sorting logic based on the "name" property
                  if (a.status === 'Diterima' && b.status !== 'Diterima') {
                    return -1;
                  } else if (a.status !== 'Diterima' && b.status === 'Diterima') {
                    return 1;
                  }
                  return 0; // No change in order if names are the same
                });
                
                setSortType("")
                setData(sortedData);
                setStatus("Diterima")
              }}>
                <div className='justify-between'>
                  <a>
                    Diterima
                  </a>
                  {sortStatus === "Diterima" && (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </>
                  )}
                </div>
              </li>
              <li className={`mt-1 ${sortStatus === "Diproses" ? "bg-gray-200 rounded-md" : ""}`} onClick={() => {
                const sortedData = [...data].sort((a, b) => {
                  // Custom sorting logic based on the "name" property
                  if (a.status === 'Diproses' && b.status !== 'Diproses') {
                    return -1;
                  } else if (a.status !== 'Diproses' && b.status === 'Diproses') {
                    return 1;
                  }
                  return 0; // No change in order if names are the same
                });
                
                setSortType("")
                setData(sortedData);
                setStatus("Diproses")
              }}>
                <div className='justify-between'>
                  <a>
                    Diproses
                  </a>
                  {sortStatus === "Diproses" && (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </>
                  )}
                </div>
              </li>
              <li className={`mt-1 ${sortStatus === "Terdaftar" ? "bg-gray-200 rounded-md" : ""}`} onClick={() => {
                const sortedData = [...data].sort((a, b) => {
                  // Custom sorting logic based on the "name" property
                  if (a.status === 'Terdaftar' && b.status !== 'Terdaftar') {
                    return -1;
                  } else if (a.status !== 'Terdaftar' && b.status === 'Terdaftar') {
                    return 1;
                  }
                  return 0; // No change in order if names are the same
                });
                
                setSortType("")
                setData(sortedData);
                setStatus("Terdaftar")
              }}>
                <div className='justify-between'>
                  <a>
                    Terdaftar
                  </a>
                  {sortStatus === "Terdaftar" && (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </>
                  )}
                </div>
              </li>
              <li className={`mt-1 ${sortStatus === "Di Ghosting" ? "bg-gray-200 rounded-md" : ""}`} onClick={() => {
                const sortedData = [...data].sort((a, b) => {
                  // Custom sorting logic based on the "name" property
                  if (a.status === 'Di Ghosting' && b.status !== 'Di Ghosting') {
                    return -1;
                  } else if (a.status !== 'Di Ghosting' && b.status === 'Di Ghosting') {
                    return 1;
                  }
                  return 0; // No change in order if names are the same
                });
                
                setSortType("")
                setData(sortedData);
                setStatus("Di Ghosting")
              }}>
                <div className='justify-between'>
                  <a>
                    Di Ghosting
                  </a>
                  {sortStatus === "Di Ghosting" && (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </>
                  )}
                </div>
              </li>
            </ul>
          </div> 
          </div>
        {data.length === 0 ? (
              <>
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Kita Bukan Genius!</th>
                      <th>Kita Harus</th>
                      <th>GAGAL</th>
                      <th>Untuk</th>
                      <th>Bisa</th>
                      <th>Berkembang</th>
                      <th>~dev</th>
                    </tr>
                  </thead>
                  {/* body */}
                  <tbody>
                    <tr>
                      <td>
                        <p className="animate-pulse text-md">Tidak ada data...</p>
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                  {/* foot */}
                  <tfoot className={`h-56`}>
                    <tr className={`hidden`}>
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
              </>
            ) : (
              <>
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
                  {data.map((items, index) => {
                    const isItFirstRow = index === 0;
                    const isItLastRow = index === data.length - 1;
                    const isItLastSecondRow = index === data.length - 2;

                    return (
                    <>
                      <tbody key={items.rowId}>
                        <tr className='hover:bg-gray-100/65'>
                          <td>{index + 1}</td>
                          <td>
                            <div className="flex items-center gap-3">
                              {activeColCompany === items.rowId ? (
                                <input
                                  value={items.mitra_brand_name}
                                  onChange={handleUpdateInputBrand}
                                  type="text"
                                  placeholder="Type here"
                                  className="input input-bordered input-sm hover:border-black w-full max-w-xs"
                                />
                              ) : (
                                <div className="font-bold">{items.mitra_brand_name}</div>
                              )}
                              {activeColCompany === items.rowId ? (
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  fill="none" viewBox="0 0 24 24" 
                                  strokeWidth={1.5} 
                                  stroke="green"
                                  className="scale-125 hover:scale-150 hover:bg-gray-200 p-1 hover:rounded-md hover:cursor-pointer duration-150 size-7 -mt-1"
                                  onClick={() => {
                                    handleToggleColCompany(items.rowId, "mitra_brand_name")
                                  }}
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                              ) : (
                                <>
                                  {modeView === "edit" && (
                                    <>
                                      <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="hover:scale-150 hover:bg-gray-200 p-1 hover:rounded-md hover:cursor-pointer duration-150 size-7 -mt-2"
                                      onClick={() => {
                                        handleToggleColCompany(items.rowId, "mitra_brand_name")
                                      }}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487z"
                                      />
                                    </svg>
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className={`
                            ${isItFirstRow ? "dropdown mr-2" :
                              isItLastRow || isItLastSecondRow ? "dropdown dropdown-right dropdown-end mr-2" :
                              "dropdown mr-2" }`}>
                              <div tabIndex={0} role="button" className={`btn btn-sm
                              ${items.name_ref_kegiatan === "Studi Independen" ? 'bg-sky-400 text-white hover:bg-sky-500' :
                                items.name_ref_kegiatan === "Magang" ? 'bg-gray-500 text-white hover:bg-gray-600' : ""}`}>
                                {items.name_ref_kegiatan ? items.name_ref_kegiatan : "Opsi"}
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 hidden xl:block">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                                  </svg>
                              </div>
                              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li>
                                  <a onClick={() => handleOptionSelect('Studi Independen', items.rowId, "name_ref_kegiatan")}>Studi Independen</a>
                                </li>
                                <li>
                                  <a onClick={() => handleOptionSelect('Magang', items.rowId, "name_ref_kegiatan")}>Magang</a>
                                </li>
                              </ul>
                            </div> 
                          </td>
                          <td>
                            <div className='inline-flex'>
                              {activeColPosition === items.rowId ? (
                                <input
                                  value={items.nama_kegiatan}
                                  onChange={handleUpdateInputPosition}
                                  type="text"
                                  placeholder="Type here"
                                  className="input input-bordered input-sm hover:border-black w-full max-w-xs"
                                />
                              ) : (
                                <p className={`${items.nama_kegiatan ? "" : "text-gray-400"}`}>{items.nama_kegiatan ? items.nama_kegiatan : "posisi yang di lamar"}</p>
                              )}
                              {activeColPosition === items.rowId ? (
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  fill="none" viewBox="0 0 24 24" 
                                  strokeWidth={1.5} 
                                  stroke="green"
                                  className="ml-3 scale-125 hover:scale-150 hover:bg-gray-200 p-1 hover:rounded-md hover:cursor-pointer duration-150 size-7 -mt-1.6"
                                  onClick={() => handleToggleColPosition(items.rowId, "nama_kegiatan")}
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                              ) : (
                                <>
                                {modeView === "edit" && (
                                  <>
                                     <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="ml-3 hover:scale-150 hover:bg-gray-200 p-1 hover:rounded-md hover:cursor-pointer duration-150 size-7 -mt-2"
                                      onClick={() => handleToggleColPosition(items.rowId, "nama_kegiatan")}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487z"
                                      />
                                    </svg>
                                  </>
                                )}
                                </>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className='inline-flex'>
                                {activeColProgress === items.rowId ? (
                                    <input
                                    value={items.progress}
                                    onChange={handleUpdateInputProgress}
                                    type="text"
                                    placeholder="Type here"
                                    className="input input-bordered input-sm hover:border-black w-full max-w-xs"
                                    />
                                ) : (
                                    <p className={`${items.progress ? "" : "text-gray-400"}`}>{items.progress ? items.progress : "proses/tahapan seleksi"}</p>
                                )}
                                {activeColProgress === items.rowId ? (
                                    <svg 
                                      xmlns="http://www.w3.org/2000/svg" 
                                      fill="none" viewBox="0 0 24 24" 
                                      strokeWidth={1.5} 
                                      stroke="green"
                                      className="ml-3 scale-125 hover:scale-150 hover:bg-gray-200 p-1 hover:rounded-md hover:cursor-pointer duration-150 size-7 -mt-1.6"
                                      onClick={() => handleToggleColProgress(items.rowId, "progress")}
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                ) : (
                                  <>
                                    {modeView === "edit" && (
                                      <>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className="ml-3 hover:scale-150 hover:bg-gray-200 p-1 hover:rounded-md hover:cursor-pointer duration-150 size-7 -mt-1"
                                          onClick={() => handleToggleColProgress(items.rowId, "progress")}
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487z"
                                          />
                                        </svg>
                                      </>
                                    )}
                                  </>
                                )}
                            </div>
                          </td>
                          <td>
                          <div className={` 
                            ${isItFirstRow ? "dropdown mr-2" :
                              isItLastRow || isItLastSecondRow ? "dropdown dropdown-left dropdown-end mr-2" : 
                              "dropdown mr-2"}`}>
                            <div tabIndex={0} role="button" 
                            className={`btn btn-sm 
                              ${items.status === "Diterima" ? 'bg-green-500 text-white hover:bg-green-600' :
                                items.status === "Diproses" ? 'bg-yellow-400 hover:text-gray-700 hover:bg-yellow-500' :
                                items.status === "Terdaftar" ? 'bg-sky-400 text-white hover:bg-sky-500' :
                                items.status === "Di Ghosting" ? '' :
                                "Opsi"}`}>
                              {items.status ? items.status : "Opsi"}
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 hidden xl:block">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                              </svg>
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                              <li>
                                <a onClick={() => handleOptionSelect('Diterima', items.rowId, "status")}>
                                  Diterima
                                </a>
                              </li>
                              <li>
                                <a onClick={() => handleOptionSelect('Diproses', items.rowId, "status")}>
                                  Diproses
                                </a>
                              </li>
                              <li>
                                <a onClick={() => handleOptionSelect('Terdaftar', items.rowId, "status")}>
                                  Terdaftar
                                </a>
                              </li>
                              <li>
                                <a onClick={() => handleOptionSelect('Di Ghosting', items.rowId, "status")}>
                                  Di Ghosting
                                </a>
                              </li>
                            </ul>
                          </div>
                          </td>
                          <th>
                            <div className='inline-flex'>
                              <button 
                                className="hover:bg-gray-200 bg-gray-200 rounded-md btn-xs text-gray-400 mr-2" 
                                disabled
                                onClick={() => (document.getElementById('detailModal') as HTMLDialogElement)?.showModal()}>
                                detail (soon)
                              </button>
                              {modeView === "edit" && (
                                <>
                                  <svg
                                    onClick={() => {(document.getElementById('deleteModal') as HTMLDialogElement)?.showModal()
                                      handleDeleteRowData(items.rowId, items.mitra_brand_name)
                                    }}
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth={1.5} 
                                    stroke="red" 
                                    className="scale-110 hover:scale-125 hover:bg-gray-200 hover:rounded-md hover:cursor-pointer duration-150 size-6 p-1"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                  </svg> 
                                </>
                              )}
                            </div>
                          </th>
                        </tr> 
                      </tbody>
                    </>
                    )
                  })}
                  {/* foot */}
                  <tfoot className={`${data.length >= 3 ? '' : 'h-56'}`}>
                    <tr className={`${data.length >= 3 ? '' : 'hidden'}`}>
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
              </>
            )} 
        </div>
      </div>
    </div>
    </>
  )
}

export default Table
