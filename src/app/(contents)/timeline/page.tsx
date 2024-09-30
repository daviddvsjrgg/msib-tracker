import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import React from 'react'

const Timeline = () => {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="
        md:card md:mx-5 md:my-6 
        mx-0 my-0
        bg-base-100 w-auto shadow-xl"
        >
            <div className="card-body">
                <div className="inline-flex">
                    <h2 className="card-title ml-1">Timeline MSIB Batch 8</h2>
                </div>
                <div className='flex justify-center border border-gray-500'>
                <Image
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
                    alt="Timeline MSIB"
                    src="https://firebasestorage.googleapis.com/v0/b/bilingual-semester-6.appspot.com/o/Semester-6%2FSimpan%20File-FILE%2FKKN%20UNTAG%20REDAKSI%2FCAT%2Fc5a46112-7000-4300-b68b-a5a5d90b82bd-a.jpeg?alt=media&token=77794a4c-b792-4779-86cb-82cc147fd3b7"
                    width={800}
                    height={400}
                    priority
                    unoptimized
                    />
                </div>
            </div>
        </div>
      <Footer />
    </main>
  )
}

export default Timeline