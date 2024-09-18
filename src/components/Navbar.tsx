'use client'

import { auth, db, ref } from '@/config/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { get, remove, set } from 'firebase/database';
import Image from 'next/image'

let linkSaweria = "https://saweria.co/davidcode";

const Navbar = () => {
    
  const signInWithGoogle = async () => {
    try {
        const currentUserId = auth.currentUser?.uid
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);

        const oldDataRef = ref(db, `users/${currentUserId}`);
        const newDataRef = ref(db, `users/${auth.currentUser?.uid}`);

        const snapshot = await get(oldDataRef);
        if (snapshot.exists()) {
            const oldData = snapshot.val();

            await set(newDataRef, oldData);
            await remove(oldDataRef);

            console.log('Data migrated successfully');
            window.location.reload();
        } else {
            console.log('No data');
        }
    } catch (error) {
        console.log(error)
    }
};
        
  return (
    <>
    {/* Login Modal */}
    {/* Open the modal using document.getElementById('ID').showModal() method */}
    <dialog id="loginModal" className="modal">
    <div className="modal-box">
        <h3 className="font-bold text-lg bg-center">Login</h3>
        <p className="py-4 text-sm -mt-3">Login menggunakan layanan google, <a href="https://firebase.google.com/docs/auth" target='_blank' className='text-blue-500'> Pelajari lebih lanjut.</a></p>
        <div className='mt-2'>
          <button
          onClick={signInWithGoogle} 
          className="w-full bg-center top-0 right-0 px-5 py-2 border flex items-center justify-center gap-2 hover:bg-gray-100 border-slate-500 dark:border-slate-300 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
              <Image 
                className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google logo"
                width={180}
                height={37}
                priority
                unoptimized />
              <span className='text-gray-900 dark:text-white '>Login dengan Google</span>
          </button>
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
                    alt="Photo Profile"
                    src={`${auth.currentUser?.photoURL ? auth.currentUser.photoURL : "https://images.unsplash.com/photo-1598935888738-cd2622bcd437?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}`}
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
                        {auth ? "Profile (anonymous)" : "Profile (null)"}
                    </a>
                </li>
                <li>
                    {auth.currentUser?.photoURL === null  ? (
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
                <li><a className='text-gray-500'>Note: Data akan otomatis terhapus dalam 30 hari/saat menghapus cache browser ini, login untuk menyimpan data kakak :D</a></li>
            </ul>
            
        </div>
    </div>
    </div>
    </>
  )
}

export default Navbar