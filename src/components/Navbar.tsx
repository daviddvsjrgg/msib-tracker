'use client'

import React from 'react';
import Image from 'next/image'
import { auth, db } from '@/config/firebase';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { get, ref, remove, set } from 'firebase/database';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

let linkSaweria = "https://saweria.co/davidcode";

const Navbar = () => {
  
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);

  useEffect(() => {
      // Add the auth state listener
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setPhotoURL(user.photoURL);
          setIsAnonymous(user.isAnonymous);
        } else {
          // If no user is signed in, reset the state
          setPhotoURL(null);
          setIsAnonymous(true);
        }
      });

      // Clean up the listener on unmount
      return () => unsubscribe();
  }, []); // Run only once on component mount

  const [clickedSigned, setClickedSigned] = useState<boolean>(false)
    
  const signInWithGoogle = async () => {
    try {
        setClickedSigned(true);
    
        // Old Data
        const currentUserId = auth.currentUser?.uid;
        const oldRef = ref(db, `users/${currentUserId}`);
        const oldRefTable = ref(db, `users/${currentUserId}/table`);
    
        // New Google Sign-In
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
    
        const userId = userCredential.user.uid;
        const tableId = uuidv4();
    
        const userRef = ref(db, `users/${userId}`);
        const snapshot = await get(userRef);
    
        if (snapshot.exists()) {
            console.log('Already have table');
        } else {
            // Retrieve data from oldRefTable
            const oldTableSnapshot = await get(oldRefTable);
            let oldTableData = null;
    
            if (oldTableSnapshot.exists()) {
                oldTableData = oldTableSnapshot.val();
            } else {
                console.log('No existing table data found');
            }
    
            const userData = {
                userId,
                table: oldTableData || {}, 
                tableId,
                username: userCredential.user.displayName,
                loginWith: 'google',
                role: 'applicant',
                maxTotalData: 22,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
    
            // Save user data to Firebase Realtime Database
            await set(ref(db, `users/${userId}`), userData);  
        }
    
        if (isAnonymous) {
            remove(oldRef);
        }

        setTimeout(() => {
            window.location.reload()
        }, 3000);
    } catch (error) {
        console.log(error);
        setClickedSigned(false);
    }
    
    
};
        
  return (
    <>
    {/* Profile Modal */}
    <input type="checkbox" id="profileModal" className="modal-toggle" />
    <div className="modal" role="dialog">
    <div className="modal-box max-w-2xl">
        <h3 className="text-lg font-bold">Profile</h3>
        <p className="py-4 text-gray-400"> Jika ingin menambah jumlah batas perusahaan, ada masalah teknis, atau yang lainnya. Coba <a className='underline text-blue-500' target='_blank' href='https://instagram.com/davidjrggbro'>DM aku</a> menyertakan ID User, terus ada kendala apa masbro.</p>
        <div className='divider -mt-1 divider-info'></div>
        <div>
            {isAnonymous ? (
                <>
                    <p>Akun Anonymous tidak memiliki ID User, silahkan login.</p>
                </>
            ) : (
                <>
                    <p>ID User: {auth.currentUser?.uid}</p>
                </>
            )}
        </div>
    </div>
    <label className="modal-backdrop" htmlFor="profileModal">Close</label>
    </div>
    {/* Guide Modal */}
    <input type="checkbox" id="guideModal" className="modal-toggle" />
    <div className="modal" role="dialog">
    <div className="modal-box max-w-7xl">
        <h3 className="text-lg font-bold">Panduan</h3>
        <div className='divider -mt-0.5'></div>
        <div>
            <a href='https://medium.com/@daviddwiyanto.social/msib-tracker-lacak-kemajuan-program-msib-anda-dengan-mudah-1ce2ae8ca82e'
                target='_blank'
                className="text-md text-blue-500 underline">1. Apa itu MSIB Tracker?</a>
        </div>
        <div className='mt-2'>
            <a href='https://medium.com/@daviddwiyanto.social/msib-tracker-lacak-kemajuan-program-msib-anda-dengan-mudah-1ce2ae8ca82e'
                target='_blank'
                className="text-md text-blue-500 underline">2. Cara dan Contoh Penggunaan MSIB Tracker.</a>
        </div>
    </div>
    <label className="modal-backdrop" htmlFor="guideModal">Close</label>
    </div>
    {/* Login Modal */}
    <dialog id="loginModal" className="modal">
    <div className="modal-box">
        <h3 className="font-bold text-lg bg-center">Login</h3>
        <p className="py-4 text-sm -mt-3 text-blue-600/90">Login untuk menyimpan data kakak. 😊</p>
        <div className=''>
        {clickedSigned ? (
            <>
            <button
            className="w-full bg-center top-0 right-0 px-5 py-2 border flex items-center dark:hover:bg-gray-50/5 justify-center gap-2 hover:bg-gray-100 border-slate-500 dark:border-slate-300 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                <span className="loading loading-spinner loading-sm"></span>
            </button>
            </>
        ) : (
            <>
            <button
            onClick={signInWithGoogle} 
            className="w-full bg-center top-0 right-0 px-5 py-2 border flex items-center dark:hover:bg-gray-50/5 justify-center gap-2 hover:bg-gray-100 border-slate-500 dark:border-slate-300 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                <Image 
                    className="w-6 h-6"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="google logo"
                    width={180}
                    height={37}
                    priority
                    unoptimized />
                <span className='text-gray-900 dark:text-white '>Login dengan Google</span>
            </button>
            </>
        )}
        </div>
    </div>
    <form method="dialog" className="modal-backdrop">
        <button>close</button>
    </form>
    </dialog>
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
            <li>
                <label htmlFor="guideModal">Panduan</label>
            </li>
            <li>
                <Link href='/timeline'>Timeline</Link>
            </li>
            {/* <li><a>Item 3</a></li> */}
        </ul>
        </div>
    {/* End Item (Mobile) */}
        <h1>
            <Link href='/' className="btn btn-ghost text-xl">MSIB Tracker</Link>
        </h1>
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
            <li>
                <label htmlFor="guideModal">Panduan</label>
            </li>
            <li>
                <Link href='/timeline'>Timeline</Link>
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
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
                    alt="Photo Profile"
                    src={`${isAnonymous ? "https://images.unsplash.com/photo-1598935888738-cd2622bcd437?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : photoURL}`}
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
                    <label htmlFor="profileModal">
                        {isAnonymous ? "Profile (anonymous)" : auth.currentUser?.displayName}
                    </label>
                </li>
                <li>
                    {isAnonymous  ? (
                        <>
                            <a onClick={() => (document.getElementById('loginModal') as HTMLDialogElement)?.showModal()}>Login</a>
                        </>
                    ) : (
                        <>
                            <a onClick={()=> {
                                signOut(auth)
                                window.location.reload();
                            }}>
                                Logout
                            </a>
                        </>
                    )}
                </li>
                {isAnonymous && (
                    <>
                        <li><a className='text-gray-500'>Note: Data akan otomatis terhapus dalam 30 hari/saat menghapus cache browser ini, login untuk menyimpan data kakak :D</a></li>
                    </>
                )}
            </ul>
            
        </div>
    </div>
    </div>
    </>
  )
}

export default Navbar