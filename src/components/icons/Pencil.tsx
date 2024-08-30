import React from 'react'
import { useRef } from 'react';

const Pencil = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play();
            videoRef.current.currentTime = 1;
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0.1;
        }
    };
  return (
    <>
        <video
            ref={videoRef}
            src="https://firebasestorage.googleapis.com/v0/b/bilingual-semester-6.appspot.com/o/Semester-6%2FSimpan%20File-FILE%2FPortfolio%2FAnimated%20Icon%2F023b17e6-94f9-43d1-bcc5-512235dfa1aa-pencil-icon.mp4?alt=media&token=3cc407f1-261e-454a-9b34-2d42af1a653a"
            width={23}
            height={23}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            loop
            className='ml-3 hover:scale-150 hover:bg-gray-500 hover:rounded-md hover:cursor-pointer duration-150'
        />
    </>
  )
}

export default Pencil