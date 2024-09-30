import React from 'react'

const ProgressExample = () => {
  return (
    <div className='animate-pulse'>
        <div className="flex gap-x-3">
            <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                <div className="relative z-10 size-7 flex justify-center items-center">
                    <div className="size-2 rounded-full bg-gray-400 dark:bg-neutral-600"></div>
                </div>
            </div>
            <div className="grow pt-0.5 pb-8">
                <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                    Lolos ke Interview
                    <div className="w-auto text-end">
                        <span className="text-xs text-gray-400 dark:text-neutral-400">20 Okt, 2024</span>
                    </div>
                    <p className='text-gray-600 animate-pulse'>(Contoh Tampilan)</p>
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                    Dilaksanakan pada 30 Oktober, 2024. Pukul 14:00 WIB - Selesai
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                    Link Zoom: <a href='https://zoom.com' target='_blank' className='text-blue-600 underline'>https://zoom.com</a>
                </p>
            </div>
        </div>
        <div className="flex gap-x-3">
            <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                <div className="relative z-10 size-7 flex justify-center items-center">
                    <div className="size-2 rounded-full bg-gray-400 dark:bg-neutral-600"></div>
                </div>
            </div>
            <div className="grow pt-0.5 pb-8">
                <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                    Lolos Tahap 1
                    <div className="w-auto text-end">
                        <span className="text-xs text-gray-400 dark:text-neutral-400">12 Sep, 2024</span>
                    </div> 
                    <p className='text-gray-600 animate-pulse'>(Contoh Tampilan)</p>
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                    Akhirnya ada kemajuan, semoga lolos seleksi selanjutnya.
                </p>
            </div>
        </div>
    </div>
  )
}

export default ProgressExample