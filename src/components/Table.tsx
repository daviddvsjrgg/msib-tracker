'use client'

import React, { useEffect, useState } from 'react'
import { authenticateAndSave } from '@/api/account/authenticateAndSave';
import { addData, addProgressData } from '@/api/usersTable/addData/addData';
import { onValue, ref} from 'firebase/database';
import { db } from '@/config/firebase';
import { updateInput, updateInputRowProgressDesc, updateInputRowProgressName, updateOption } from '@/api/usersTable/editData/editData';
import { deleteItem, deleteProgress } from '@/api/usersTable/deleteData/deleteData';
import ProgressExample from '@/components/ProgressExample';

interface TableData {
  rowId: string,
  status: string,
  lokasi: string,
  nama_kegiatan: string,
  deskripsi: string,
  name_ref_kegiatan: string,
  mitra_logo: string,
  mitra_brand_name: string,
  semester_program: string,
  note: string,
  cycle: string,
  progress: any,
  createdAt: string,
  updatedAt: string,
}
interface ProgressData {
  progressId: string,
  progressName: string,
  description: string,
  createdAt: string,
}

const Table: React.FC = () => {
  
  // loading
  const [loading, setLoading] = useState(true);

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
  const [dbLocationColumn, setDbLocationColumn] = useState<string | null>('')
  const [dbProgressRowName, setDbProgressRowName] = useState<string | null>('')
  const [dbProgressRowDesc, setDbProgressRowDesc] = useState<string | null>('')

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

  // Column Location
  const [activeColLocation, setActiveColLocation] = useState<string | null>(null);

  const handleToggleColProgress = (id: string, dbLocationColumn: string) => {
    setDbLocationColumn(dbLocationColumn)
    setActiveColLocation(activeColLocation === id ? null : id);
  };

  // Column Location
  const [activeRowProgressName, setActiveRowProgress] = useState<string | null>(null);

  const handleToggleRowProgressName = (progressId: string, dbProgressRowName: string) => {
    setDbProgressRowName(dbProgressRowName)
    setActiveRowProgress(activeRowProgressName === progressId ? null : progressId);
  };
  // Column Location
  const [activeRowProgressDesc, setActiveRowProgressDesc] = useState<string | null>(null);

  const handleToggleRowProgressDesc = (progressId: string, dbProgressRowDesc: string) => {
    setDbProgressRowDesc(dbProgressRowDesc)
    setActiveRowProgressDesc(activeRowProgressDesc === progressId ? null : progressId);
  };

  // Column Note
  const [mitraBrandName, setMitraBrandName] = useState<string | null>('')
  const [noteRowId, setNoteRowId] = useState<string | null>('')
  const [dbNoteColumn, setDbNoteColumn] = useState<string | null>('')
  const [noteShowEdit, setNoteShowEdit] = useState<boolean>(false)

  const [noteData, setNoteData] = useState(null);

   const handleToggleNoteTextArea = (rowId: string, mitra_brand_name: string, dbNoteColumn: string) => {
    setMitraBrandName(mitra_brand_name)
    setNoteRowId(rowId)
    setDbNoteColumn(dbNoteColumn)


    const dbRef = ref(db, `users/${userId}/table/${rowId}/${dbNoteColumn}`);

    onValue(dbRef, (snapshot) => {
      const newData = snapshot.val();
      setNoteData(newData);
    });
  }

  // Add Company
  const [namaPerusahaan, setNamaPerusahaan] = useState<string>('');
  const [namaPerusahaanIsEmpty, setNamaPerusahaanIsEmpty] = useState<boolean>(false);
  
  // Tambahkan Button
  const [addButton, setAddButton] = useState<boolean>(false);
  
  const handleTambahPerusahaan = async () => {
    if (namaPerusahaan !== "" && tableId && userId) {
      try {
        // Reset Filter
        setSortType("")
        setSortStatus("")

        setAddButton(true)
        await addData(userId, namaPerusahaan);
        setNamaPerusahaan(''); // Clear the input after saving
        setNamaPerusahaanIsEmpty(false); // Reset validation flag
        setTimeout(() => {
          setAddButton(false)
        }, 2000);
      } catch (error) {
        console.error('Error adding data:', error);
      }
      setNamaPerusahaan('')
    } else {
      setNamaPerusahaanIsEmpty(true)
    }
  }

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

  // Edit location Input
  const handleUpdateInputLocation = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const locationValue = e.target.value
    if (userId && activeColLocation && dbLocationColumn) {
      updateInput(locationValue, userId, activeColLocation, dbLocationColumn);
    }
  };

  // Edit Note Input
  const handleUpdateTextAreaNote = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const noteValue = e.target.value
    if (userId && noteRowId && dbNoteColumn) {
      updateInput(noteValue, userId, noteRowId, dbNoteColumn);
    }
  };

  
  // Edit Progress Name Input
  const handleUpdateInputProgressName = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const progressNameValue = e.target.value
    if (userId && activeRowProgressName && dbProgressRowName && progressRowId) {
      updateInputRowProgressName(progressNameValue, progressRowId, userId, activeRowProgressName, dbProgressRowName);
    }
  };

  // Edit Progress Desc Input
  const handleUpdateTextAreaProgressDesc = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const progressDescValue = e.target.value
    if (userId && progressRowId && dbProgressRowDesc && activeRowProgressDesc) {
      updateInputRowProgressDesc(progressDescValue, progressRowId, userId, activeRowProgressDesc, dbProgressRowDesc);
    }
  };

  const renderTextWithLinksAndSpacesAndNewlines = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return text.split(/\n/).map((line, index) => (
      <React.Fragment key={index}>
        {line.split(urlRegex).map((part, i) => {
          if (part.match(urlRegex)) {
            return (
              <a
                href={part}
                key={i}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
                style={{ wordBreak: 'break-all', overflowWrap: 'break-word' }}
              >
                {part}
              </a>
            );
          }

          // Replace multiple tabs and spaces
          const formattedText = part
            .replace(/\t+/g, (tabs) => '\u00A0'.repeat(tabs.length * 4)) // Replace tabs with 4 non-breaking spaces per tab
            .replace(/ {2,}/g, (spaces) => '\u00A0'.repeat(spaces.length)); // Replace multiple spaces with &nbsp;

          return <span key={i}>{formattedText}</span>;
        })}
        {/* Add <br /> for every newline except for the last */}
        {index < text.split(/\n/).length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const [progressRowId, setProgressRowId] = useState<string | null>('')
 
  // Progress 
  const handleProgress = (rowId: string, mitra_brand_name: string) => {
    setMitraBrandName(mitra_brand_name)
    setProgressRowId(rowId)
  }


  // Delete Row Data
  const [rowIdToDelete, setRowIdToDelete] = useState<string | null>('')
  const [brandToDelete, setBrandToDelete] = useState<string | null>('')

  const handleDeleteRowData = async (rowId: string, brandToDelete: string) => {
    setRowIdToDelete(rowId)
    setBrandToDelete(brandToDelete)
  }

  // Mode Table
  const [modeViewTable, setModeViewTable] = useState('');
  
  useEffect(() => {
    const savedModeViewTable = localStorage.getItem('modeViewTable');
    if (savedModeViewTable) {
      setModeViewTable(savedModeViewTable);
    } else {
      setModeViewTable("edit")
    }
  }, []);

  // Mode Table
  const [modeViewProgress, setModeViewProgress] = useState('');
  
  useEffect(() => {
    const savedModeViewProgress = localStorage.getItem('modeViewProgress');
    if (savedModeViewProgress) {
      setModeViewProgress(savedModeViewProgress);
    } else {
      setModeViewProgress("edit")
    }
  }, []);

  // Add Progress
  const handleAddProgress = async (rowId: string) => {
    console.log(rowId)
    if (userId) {
      addProgressData(userId, rowId)
    } else {
      console.log("Error adding progress")
    }
  }

  // Sorting
  const [sortType, setSortType] = useState<string | null>(null);
  const [sortStatus, setSortStatus] = useState<string | null>(null);

  const handleSortType = (name: string) => {
    setSortStatus("")
    setSortType(name)
  }

  const handleSortStatus = (name: string) => {
    setSortType("")
    setSortStatus(name)
  }

  // Fetch Progress
  const [progressData, setProgressData] = useState<ProgressData[]>([]);

  useEffect(() => {
    try {
      if (userId) {
        const dbRef = ref(db, `users/${userId}/table/${progressRowId}/progress`);
        // Fetch data in real-time
        const unsubscribe = onValue(dbRef, (snapshot) => {
          const fetchedData: ProgressData[] = [];
          snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val() as ProgressData;
            fetchedData.push(item);
          });
    
          // Sorting logic
          let sortedData = [...fetchedData];
          sortedData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setProgressData(sortedData);
        });
    
        // Cleanup subscription on unmount
        return () => unsubscribe();
      }
    } catch (error) {
      console.log("fetch fail: " + error)
    }
    
  }, [userId, progressRowId]);

  // Fetch Table
  const [data, setData] = useState<TableData[]>([]);
  const [maxTotalData, setMaxTotalData] = useState<number | null>(null);


  useEffect(() => {
      const currenUserRef = ref(db, `users/${userId}`);

      const unsubscribe = onValue(currenUserRef, (snapshot) => {
          if (snapshot.exists()) {
              const userData = snapshot.val();
              setMaxTotalData(userData.maxTotalData); 
          } else {
              setMaxTotalData(null);
          }
      }, (error) => {
          console.error("Error fetching data:", error); 
      });

      return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    try {
      if (userId) {
        const dbRef = ref(db, `users/${userId}/table`);
  
        // Fetch data in real-time
        const unsubscribe = onValue(dbRef, (snapshot) => {
          const fetchedData: TableData[] = [];
          snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val() as TableData;
  
            // Ensure `progress` is an array, or convert it if it's not
            if (item.progress && typeof item.progress === 'object') {
              item.progress = Object.values(item.progress); // Convert object to array
            }
  
            fetchedData.push(item);
          });
  
          // Sorting logic
          let sortedData = [...fetchedData];
  
          if (sortType) {
            sortedData.sort((a, b) => {
              if (a.name_ref_kegiatan === sortType && b.name_ref_kegiatan !== sortType) {
                return -1;
              } else if (a.name_ref_kegiatan !== sortType && b.name_ref_kegiatan === sortType) {
                return 1;
              }
              return 0;
            });
          } else if (sortStatus) {
            sortedData.sort((a, b) => {
              if (a.status === sortStatus && b.status !== sortStatus) {
                return -1;
              } else if (a.status !== sortStatus && b.status === sortStatus) {
                return 1;
              }
              return 0;
            });
          } else {
            sortedData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          }
  
          setData(sortedData);
          setSortType(sortType);
          setSortStatus(sortStatus);
          setLoading(false);
        });
  
        // Cleanup subscription on unmount
        return () => unsubscribe();
      }
    } catch (error) {
      console.log("fetch fail: " + error);
    }
  }, [userId, sortStatus, sortType]);
  
  

  return (
    <>
    {/* Modal Note */}
    <dialog id="detailModal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
      <div className='justify-between flex'>
        <h3 className="font-bold text-lg">Catatan {mitraBrandName}</h3>
        <div className='modal-dialog'>
          <form method="dialog">
            <button className="btn">⨉</button>
          </form>
        </div>
      </div>
        <p className="text-sm text-gray-400 xl:-mt-5">Otomatis tersimpan</p>
        <div className="divider divider-info -mb-1"></div>
        <label className="form-control">
          <div className="label">
          <span className="label-text flex my-2">Catatan
          {noteShowEdit ? (
            <>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="green"
                onClick={() => setNoteShowEdit(false)}
                className="ml-3 scale-125 hover:scale-150 hover:bg-gray-200 p-1 hover:rounded-md hover:cursor-pointer duration-150 size-7 -mt-2 -mt-1.6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </>
          ): (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                onClick={() => setNoteShowEdit(true)}
                className="ml-3 hover:scale-150 hover:bg-gray-200 p-1 hover:rounded-md hover:cursor-pointer duration-150 size-7 -mt-2 dark:hover:bg-gray-50/5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487z"
                />
              </svg>
            </>
          )}
            </span>
          </div>
          {noteShowEdit && (
            <>
              <textarea
                value={noteData !== null ? noteData : ''}
                onChange={handleUpdateTextAreaNote}
                className="textarea textarea-bordered h-48 display" 
                placeholder="medsos perusahaan, informasi perusahaan atau catatan lainnya"
              />
              <p className='mt-2 label-text focus'>Hasil:</p>
            </>
          )}
          
           <div className="mt-1 bg-gray-100/70 p-3 rounded-xl dark:bg-gray-50/5">
           {noteData ? (
              <div>{renderTextWithLinksAndSpacesAndNewlines(noteData)}</div>
            ) : (
              <p className="text-gray-500">Belum ada catatan.</p>
            )}
            </div>
          <div className="label">
          </div>
        </label>
      </div>
    </dialog>
    {/* Progress Detail */}
    <dialog id="progressModal" className="modal">
      <div className="modal-box w-11/12 max-w-3xl">
        <div className='justify-between flex'>
          <h3 className="font-bold text-lg">Kemajuan {mitraBrandName}</h3>
          <div className='modal-dialog'>
            <form method="dialog">
              <button className="btn">⨉</button>
            </form>
          </div>
        </div>
        <p className="text-sm text-gray-400 xl:-mt-5">Otomatis tersimpan</p>
        <div>
          <div className='justify-between flex'>
            <button 
            onClick={() => {
              handleAddProgress(progressRowId? progressRowId : "")
            }}
            className="btn btn-sm mt-2 hover:scale-105 duration-150 dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white">
              Tambah Kemajuan
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </button>
            <div className="dropdown dropdown-left dropdown-end mt-3">
          <div tabIndex={0} role="button" className={`btn btn-xs  bg-white border-gray-400 dark:text-black dark:hover:bg-black dark:hover:text-white`}>
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
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow">
            <li onClick={() => {
              localStorage.setItem('modeViewProgress', "edit")
              setModeViewProgress("edit")
            }}
            className={`mt-1 ${modeViewProgress === "edit" ? "bg-gray-200 dark:bg-gray-50/5 rounded-md" : ""}`}>
              <div className='justify-between'>
                <a>
                  Edit
                </a>
                {modeViewProgress === "edit" && (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </>
                )}
              </div>
            </li>
            <li onClick={() => {
              localStorage.setItem('modeViewProgress', "view")
              setModeViewProgress("view")
            }} 
                  className={`mt-1 ${modeViewProgress === "view" ? "bg-gray-200 dark:bg-gray-50/5 rounded-md" : ""}`}>
              <div className='justify-between'>
                <a>
                  Lihat Aja
                </a>
                {modeViewProgress === "view" && (
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
        </div> 
        <div className="divider divider-info mt-1"></div>
        {/* Progress */}
        <div>
              {progressData.length === 0 ? (
                <>
                  <ProgressExample />
                </>
              ) : (
                <>
                {progressData.map((progress) => (
                  <>
                    <div className="flex gap-x-3">
                          <div className='text-end tooltip tooltip-right' data-tip="Hapus Kemajuan">
                            {modeViewProgress == "edit" && (
                              <>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  strokeWidth={1.5} 
                                  stroke="red"
                                  onClick={()=>{
                                    if (userId && progressRowId) {
                                      deleteProgress(userId, progressRowId, progress.progressId)
                                    }
                                  }}
                                  className="scale-110 hover:scale-125 hover:bg-gray-200 hover:rounded-md hover:cursor-pointer duration-150 size-6 p-1"
                                  >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg> 
                              </>
                            )}
                          </div>
                        <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                          <div className="relative z-10 size-7 flex justify-center items-center">
                            <div className="size-2 rounded-full bg-gray-400 dark:bg-neutral-600"></div>
                          </div>
                        </div>
                        <div className="grow pt-0.5 pb-8">
                          <div className='flex'>
                          {activeRowProgressName === progress.progressId ? (
                              <input
                              value={progress.progressName}
                              onChange={handleUpdateInputProgressName}
                              type="text"
                              placeholder="Type here"
                              className="input input-bordered input-sm hover:border-black w-full max-w-xs"
                              />
                          ) : (
                            <>
                              <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                                {progress.progressName}
                                <div className="w-auto text-end">
                                <span className="text-xs text-gray-400 dark:text-neutral-400">
                                  {new Date(progress.createdAt).toLocaleDateString('id-ID', {
                                    timeZone: 'Asia/Jakarta',
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                  }).replace(/(?<=\w{3})\s/, ', ')}
                                </span>
                                </div>
                              </h3>
                            </>
                          )}
                            {activeRowProgressName === progress.progressId ? (
                                  <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" viewBox="0 0 24 24" 
                                    strokeWidth={1.5} 
                                    stroke="green"
                                    className="hover:scale-120 hover:bg-gray-200 p-1 ml-2 hover:rounded-md hover:cursor-pointer duration-150 size-7"
                                    onClick={() => {
                                      handleToggleRowProgressName(progress.progressId, "progressName")
                                    }}
                                    >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                  </svg>
                              ) : (
                                <>
                                  {modeViewProgress === "edit" && (
                                    <>
                                    <div className='xl:tooltip xl:tooltip-right' data-tip="Edit nama kemajuan">
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="hover:scale-125 hover:bg-gray-200 ml-2 p-1 -mt-0.5 hover:rounded-md hover:cursor-pointer duration-150 size-6 dark:hover:bg-gray-50/5"
                                        onClick={() => {
                                          handleToggleRowProgressName(progress.progressId, "progressName")
                                        }}
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487z"
                                        />
                                      </svg>
                                    </div>
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                            {modeViewProgress === "edit" ? (
                              <>
                                <div className='flex'>
                                  {activeRowProgressDesc === progress.progressId ? (
                                    <>
                                    </>
                                  ) : (
                                    <>
                                      <p className="mt-1.5 text-sm text-gray-600 dark:text-neutral-400">
                                        {renderTextWithLinksAndSpacesAndNewlines(progress.description)}
                                      </p>
                                    </>
                                  )}
                                    {activeRowProgressDesc === progress.progressId ? (
                                        <>
                                          <textarea
                                            value={progress.description}
                                            onChange={handleUpdateTextAreaProgressDesc}
                                            className="textarea textarea-bordered h-96 w-full display" 
                                          />
                                          <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" viewBox="0 0 24 24" 
                                            strokeWidth={1.5} 
                                            stroke="green"
                                            onClick={() => handleToggleRowProgressDesc(progress.progressId, "description")}
                                            className="ml-2 mt-1 scale-125 hover:scale-150 hover:bg-gray-200 p-1 hover:rounded-md hover:cursor-pointer duration-150 size-6"
                                          >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                          </svg>
                                        </>
                                      ): (
                                        <>
                                          <div className='xl:tooltip xl:tooltip-left' data-tip="Edit deskripsi">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              strokeWidth={1.5}
                                              stroke="currentColor"
                                              onClick={() => handleToggleRowProgressDesc(progress.progressId, "description")}
                                              className="ml-2 mt-1 hover:scale-150 hover:bg-gray-200 p-1 hover:rounded-md hover:cursor-pointer duration-150 size-6 dark:hover:bg-gray-50/5"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487z"
                                                />
                                            </svg>
                                          </div>
                                        </>
                                      )}
                                  </div>
                              </>
                            ) : (
                              <>
                                <p className="mt-1.5 text-sm text-gray-600 dark:text-neutral-400">
                                 {renderTextWithLinksAndSpacesAndNewlines(progress.description)}
                                </p>
                              </>
                            )}
                        </div>
                    </div>
                  </>
                ))}
                </>
              )}
        </div>
      </div>
    </dialog>
    {/* Modal Add */}
    <dialog id="addModal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
      <div className='flex justify-between mb-4'>
        <h3 className="font-bold text-lg">Tambah List Perusahaan</h3>
        <form method="dialog">
          <button className="btn">⨉</button>
        </form>
      </div>
        <div className="divider divider-info -my-1"></div>
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
                <p className='text-sm text-red-600 mt-1'>Hah kosong kak? Isi dulu dong, nama perusahaan apa gitu 😊</p>
              </>
            )}
        </label>
        </div>
        <div className="modal-action">
          {maxTotalData !== null && data.length >= maxTotalData ? (
              <>
                  <button disabled className='btn text-black bg-gray-200 dark:hover:bg-gray-300'>
                      Limit 😊
                  </button>
              </>
          ) : namaPerusahaanIsEmpty ? (
              <>
                  <button onClick={handleTambahPerusahaan} className="btn btn-info hover:text-gray-200 text-white ">
                      Tambahkan
                  </button>
              </>
          ) : (
              <form method="dialog">
                  <button onClick={handleTambahPerusahaan} className="btn btn-info hover:text-gray-200 text-white ">
                      Tambahkan
                  </button>
              </form>
          )}
        </div>
      </div>
    </dialog>
    {/* Modal Delete Row */}
    {/* Put this part before </body> tag */}
    <dialog id="deleteModal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg flex">Apa yakin menghapus List: <p className='text-sky-600 ml-2'>{brandToDelete}</p>?</h3>
        <p className="py-4">Datanya akan hilang seperti dia yang dulu menghilang darimu.</p>
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
    {/* Alert */}
    {addButton && (
        <div role="alert" className="flex alert alert-success fixed bottom-4 right-4 z-50 w-auto md:w-3/12 animate-bounce items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current text-gray-700 "
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className='text-white -ml-2'>Data baru ditambahkan</span>
        </div>
    )}
    <div className="
      md:card md:mx-5 md:my-6 
      mx-0 my-0
      bg-base-100 w-auto shadow-xl"
      >
      <div className="card-body">
      {loading ? (
        <div className={`text-xl badge badge-ghost p-3 ${data.length !== 0 ? "" : "animate-pulse"}`}>0/22</div>
      ) : (
        <div className={`text-xl badge badge-ghost p-3 ${data.length !== 0 ? "" : ""}`}>{data.length !== 0 ? data.length : "0"}/{maxTotalData ? maxTotalData : "22"}</div>
      )}
        <div className="inline-flex">
          <h2 className="card-title ml-1">List Perusahaan</h2>
          {loading ? (
            <>
              <button disabled className="btn btn-sm ml-2 hover:scale-105 duration-150 dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white">
                Tambah
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-sm ml-2 hover:scale-105 duration-150 dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
              onClick={() => (document.getElementById('addModal') as HTMLDialogElement)?.showModal()}>
                Tambah
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>
              </button>
            </>
          )}
        </div>
          <h2 className="text-sm ml-1 -my-2 text-gray-400">Update secara realtime</h2>
        <div className="overflow-x-auto">
          <div className='mt-2'>
          <div className="dropdown">
            <div tabIndex={0} role="button" className={`btn btn-xs bg-white border-gray-400 dark:text-black dark:hover:bg-black dark:hover:text-white`}>
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
                localStorage.setItem('modeViewTable', "edit")
                setModeViewTable("edit")
              }}
              className={`mt-1 ${modeViewTable === "edit" ? "bg-gray-200 dark:bg-gray-50/5 rounded-md" : ""}`}>
                <div className='justify-between'>
                  <a>
                    Edit
                  </a>
                  {modeViewTable === "edit" && (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </>
                  )}
                </div>
              </li>
              <li onClick={() => {
                localStorage.setItem('modeViewTable', "view")
                setModeViewTable("view")
              }} 
                    className={`mt-1 ${modeViewTable === "view" ? "bg-gray-200 dark:bg-gray-50/5 rounded-md" : ""}`}>
                <div className='justify-between'>
                  <a>
                    Lihat Aja
                  </a>
                  {modeViewTable === "view" && (
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
            <div tabIndex={0} role="button" className={`btn btn-xs bg-white border-gray-400 dark:text-black dark:hover:bg-black dark:hover:text-white`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
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
              <li className={`mt-1 ${sortType === "Studi Independen" ? "bg-gray-200 dark:bg-gray-50/5 rounded-md" : ""}`} onClick={() => {
                handleSortType("Studi Independen")
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
              <li className={`mt-1 ${sortType === "Magang" ? "bg-gray-200 dark:bg-gray-50/5 rounded-md" : ""}`} onClick={() => {
                handleSortType("Magang")
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
              <li className={`mt-1 ${sortType === "Mandiri" ? "bg-gray-200 dark:bg-gray-50/5 rounded-md" : ""}`} onClick={() => {
                handleSortType("Mandiri")
              }}>
              <div className='justify-between'>
                  <a>
                    Mandiri
                  </a>
                  {sortType === "Mandiri" && (
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
            <div tabIndex={0} role="button" className={`btn btn-xs bg-white border-gray-400 dark:text-black dark:hover:bg-black dark:hover:text-white`}>
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
            <li className={`mt-1 ${sortStatus === "Diterima" ? "bg-gray-200 dark:bg-gray-50/5 rounded-md" : ""}`} onClick={() => {
                handleSortStatus("Diterima")
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
              <li className={`mt-1 ${sortStatus === "Diproses" ? "bg-gray-200 dark:bg-gray-50/5 rounded-md" : ""}`} onClick={() => {
                handleSortStatus("Diproses")
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
              <li className={`mt-1 ${sortStatus === "Terdaftar" ? "bg-gray-200 dark:bg-gray-50/5 rounded-md" : ""}`} onClick={() => {
                handleSortStatus("Terdaftar")
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
              <li className={`mt-1 ${sortStatus === "Tidak Lolos" ? "bg-gray-200 dark:bg-gray-50/5 rounded-md" : ""}`} onClick={() => {
                handleSortStatus("Tidak Lolos")
              }}>
                <div className='justify-between'>
                  <a>
                    Tidak Lolos
                  </a>
                  {sortStatus === "Tidak Lolos" && (
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
                      <th>Berani Untuk Gagal</th>
                      <th>Untuk</th>
                      <th>Bisa</th>
                      <th>Berkembang</th>
                      <th>~karakter anime</th>
                    </tr>
                  </thead>
                  {/* body */}
                  <tbody>
                    <tr>
                      <td>
                        {loading ? (
                          <a>
                            <p className="animate-pulse text-md">Loading data...</p>
                          </a>
                        ) : (
                          <>
                            <p className="text-md">Tidak ada data masbro, silakan Tambah terlebih dahulu.</p>
                          </>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {loading ? (
                          <></>
                        ) : (
                          <>
                            <a href='https://medium.com/@daviddwiyanto.social/msib-tracker-lacak-kemajuan-program-msib-anda-dengan-mudah-1ce2ae8ca82e'
                              target='_blank'
                              className="text-md text-blue-500 underline">Apa itu MSIB Tracker?</a>
                          </>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {loading ? (
                          <></>
                        ) : (
                          <>
                            <a href='https://medium.com/@daviddwiyanto.social/msib-tracker-lacak-kemajuan-program-msib-anda-dengan-mudah-1ce2ae8ca82e'
                              target='_blank'
                              className="text-md text-blue-500 underline">Cara dan Contoh Penggunaan MSIB Tracker.</a>
                          </>
                        )}
                      </td>
                    </tr>
                  </tbody>
                  {/* foot */}
                  <tfoot className={`h-56`}>
                    <tr className={`hidden`}>
                    <th>Kita Bukan Genius!</th>
                      <th>Kita Harus</th>
                      <th>Berani Untuk Gagal</th>
                      <th>Untuk</th>
                      <th>Bisa</th>
                      <th>Berkembang</th>
                      <th>~karakter anime</th>
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
                      <th>Lokasi</th>
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
                      <tbody key={items.rowId}>
                        <tr className='hover:bg-gray-100 dark:hover:bg-gray-50/5'>
                          <td>
                            {index + 1}
                          </td>
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
                                <div className="font-bold">
                                  {items.mitra_brand_name
                                  ? items.mitra_brand_name.split(' ').map((word, index) => (
                                      index > 0 && index % 2 === 0 ? (
                                        <React.Fragment key={index}>
                                          <br />
                                          {word}{' '}
                                        </React.Fragment>
                                      ) : (
                                        word + ' '
                                      )
                                    ))
                                  : ""}
                                </div>
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
                                  {modeViewTable === "edit" && (
                                    <>
                                      <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="hover:scale-150 hover:bg-gray-200 p-1 hover:rounded-md hover:cursor-pointer duration-150 size-7 dark:hover:bg-gray-50/5"
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
                              <div className='xl:flex'>
                              <div tabIndex={0} role="button" className={`btn btn-sm
                              ${items.name_ref_kegiatan === "Studi Independen" ? 'bg-sky-400 hover:bg-sky-500 dark:bg-sky-700 darkhover:bg-sky-800 text-white ' :
                                items.name_ref_kegiatan === "Magang" ? 'bg-gray-500 hover:bg-gray-600 text-white dark:bg-gray-700 dark:hover:bg-gray-800' : 
                                items.name_ref_kegiatan === "Mandiri" ? 'hover:bg-gray-200 text-black dark:bg-gray-100 dark:hover:bg-gray-200' : ""}`}>
                                {items.name_ref_kegiatan ? items.name_ref_kegiatan : "Opsi"}
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 hidden xl:block">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                                  </svg>
                              </div>
                              </div>
                              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow flex-none">
                                <li>
                                  <a onClick={() => handleOptionSelect('Studi Independen', items.rowId, "name_ref_kegiatan")}>Studi Independen</a>
                                </li>
                                <li>
                                  <a onClick={() => handleOptionSelect('Magang', items.rowId, "name_ref_kegiatan")}>Magang</a>
                                </li>
                                <li>
                                  <a onClick={() => handleOptionSelect('Mandiri', items.rowId, "name_ref_kegiatan")}>Mandiri</a>
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
                                <p className={`${items.nama_kegiatan ? "" : "text-gray-400"}`}>{items.nama_kegiatan ? items.nama_kegiatan : "HR/IT/Sales?"}</p>
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
                                {modeViewTable === "edit" && (
                                  <>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="ml-3 hover:scale-150 hover:bg-gray-200 p-1 hover:rounded-md hover:cursor-pointer duration-150 size-7 -mt-2 dark:hover:bg-gray-50/5"
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
                                {activeColLocation === items.rowId ? (
                                    <input
                                    value={items.lokasi}
                                    onChange={handleUpdateInputLocation}
                                    type="text"
                                    placeholder="Type here"
                                    className="input input-bordered input-sm hover:border-black w-full max-w-xs"
                                    />
                                ) : (
                                    <p className={`${items.lokasi ? "" : "text-gray-400"}`}>{items.lokasi ? items.lokasi : "kota, wfo/wfh?"}</p>
                                )}
                                {activeColLocation === items.rowId ? (
                                    <svg 
                                      xmlns="http://www.w3.org/2000/svg" 
                                      fill="none" viewBox="0 0 24 24" 
                                      strokeWidth={1.5} 
                                      stroke="green"
                                      className="ml-3 scale-125 hover:scale-150 hover:bg-gray-200 p-1 hover:rounded-md hover:cursor-pointer duration-150 size-7 -mt-1.6"
                                      onClick={() => handleToggleColProgress(items.rowId, "lokasi")}
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                ) : (
                                  <>
                                    {modeViewTable === "edit" && (
                                      <>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className="ml-3 hover:scale-150 hover:bg-gray-200 p-1 hover:rounded-md hover:cursor-pointer duration-150 size-7 -mt-1 dark:hover:bg-gray-50/5"
                                          onClick={() => handleToggleColProgress(items.rowId, "lokasi")}
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
                            <div className='xl:flex'>
                                <div tabIndex={0} role="button" 
                                className={`btn btn-sm 
                                  ${items.status === "Diterima" ? 'bg-green-500 text-white hover:bg-green-600' :
                                  items.status === "Diproses" ? 'bg-yellow-400 hover:text-gray-700 dark:text-black hover:bg-yellow-500' :
                                  items.status === "Terdaftar" ? 'bg-sky-400 text-white hover:bg-sky-500' :
                                  items.status === "Tidak Lolos" ? '' :
                                  "Opsi"}`}>
                                  {items.status ? items.status : "Opsi"}
                                  <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 hidden xl:block">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                                    </svg>
                                  </div>
                                </div>
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
                                <a onClick={() => handleOptionSelect('Tidak Lolos', items.rowId, "status")}>
                                  Tidak Lolos
                                </a>
                              </li>
                            </ul>
                          </div>
                          </td>
                          <th>
                            <div className='inline-flex'>
                              <button 
                                className="indicator mr-2 z-20 btn btn-xs hover:bg-gray-200 hover:scale-105 dark:bg-gray-50 dark:text-black bg-gray-200 rounded-md text-gray-700" 
                                onClick={() => {
                                  (document.getElementById('progressModal') as HTMLDialogElement)?.showModal()
                                  handleProgress(items.rowId, items.mitra_brand_name)
                                }}>
                                Kemajuan                              
                                {Array.isArray(items.progress) ? (
                                  <>
                                  <span className="indicator-item badge bg-gray-50 border border-gray-200 dark:bg-gray-50 dark:text-black">
                                    {items.progress.length}
                                  </span>
                                  </>
                                ) : (
                                  <>
                                  </>
                                )}
                              </button>
                              <button 
                                className="btn btn-xs hover:bg-gray-200 hover:scale-105 dark:bg-gray-50 dark:text-black bg-gray-200 rounded-md text-gray-700 mr-2" 
                                onClick={() => {
                                  (document.getElementById('detailModal') as HTMLDialogElement)?.showModal()
                                  handleToggleNoteTextArea(items.rowId, items.mitra_brand_name, "note")
                                }}>
                                Catatan
                              </button>
                              {modeViewTable === "edit" && (
                                <>
                                  <div className='tooltip' data-tip="Hapus perusahaan">
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
                                  </div>
                                </>
                              )}
                            </div>
                          </th>
                        </tr> 
                      </tbody>
                    )
                  })}
                  {/* foot */}
                  <tfoot className={`${data.length >= 3 ? '' : 'h-56'}`}>
                    <tr className={`${data.length >= 3 ? '' : 'hidden'}`}>
                      <th>No</th>
                      <th>Nama Perusahaan</th>
                      <th>Jenis</th>
                      <th>Posisi</th>
                      <th>Lokasi</th>
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
