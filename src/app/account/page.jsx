import Image from 'next/image'
import React from 'react'
import LoginForm from '../lib/loginform'
import { auth } from "../firebase/firebase";

const page = () => {
  
  return (
    <div className='w-full flex flex-col justify-center'>
        <div className="max-h-screen h-screen flex flex-col items-center justify-center mx-auto max-w-[600px]">
          
          <div className='flex items-center flex-col rounded-xl p-4 m-4 gap-4 bg-blue-600'>
            <div className='h-fit'>
            <Image
            className="h-40 sm:h-60 rounded-lg overflow-hidden self-center object-scale-down"
            src="/videocall.png"
            alt="info graphic"
            height="200"
            width="300"
            priority={false}
            style={{ objectFit: "scale-down" }}
          />
              </div>
            <div className='self-center'>
              <LoginForm/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default page