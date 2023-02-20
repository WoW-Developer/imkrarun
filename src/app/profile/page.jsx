/* eslint-disable @next/next/no-img-element */
'use client'
import { onAuthStateChanged, updateProfile } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { BsToggleOff, BsToggleOn } from 'react-icons/bs'
import React, { useEffect, useState } from 'react'
import { auth } from '../lib/firebase/firebase'
import Image from 'next/image'

const Profile = () => {
    const router = useRouter();
    const [loading,setLoading] = useState(true)
    const [editProfile,setEditProfile] = useState(false) 
    useEffect(() => {
        onAuthStateChanged(auth,(user)=>{
            if(!user){
                setLoading(true)
                router.replace('/')
                return
            }
            setLoading(false)
        })
    }, [router])

   const toggleEditProfile=()=>{
        setEditProfile(!editProfile)
    }




    const [name, setName] = useState('');

    const handleSubmit = (event) => {
      setLoading(true)
      event.preventDefault();
      updateProfile(auth.currentUser, {
         displayName: name, photoURL: Math.random()>0.5 ? 'https://randomuser.me/api/portraits/men/1.jpg' : 'https://randomuser.me/api/portraits/women/1.jpg'
       }).then(() => {
         // Success
         setLoading(false)
         setEditProfile(false)
       }).catch((error) => {
         // An error occurred
         setLoading(false)
         setEditProfile(false)
       });
      console.log(`Submitted name: ${name}`);
    };
  
    const handleChange = (event) => {
      setName(event.target.value);
    };




    if(loading){
        return <div className='flex h-screen w-screen justify-center items-center'>
            <h1 className='text-2xl text-white animate-pulse'>Loading</h1>
        </div>
    }

    
    if(!loading && !editProfile){
    return (
         <>
         <div className='flex w-screen h-screen flex-col items-center justify-center text-white'>

         <div className='flex max-w-[600px] w-full flex-col mx-auto justify-center items-center'>

         <div className=' text-white text-2xl self-end' onClick={(e)=> {e.preventDefault; toggleEditProfile()}}>{editProfile?<BsToggleOn/>:<BsToggleOff/>}</div>


<div className='rounded-full'>
         <img
         className='w-52 h-52 rounded-full object-scale-down'
         src={auth.currentUser?.photoURL} alt='user photo'/>
         </div>
         <h1 className='text-xl capitalize'>{auth.currentUser?.displayName}</h1>
         <h1 className='text-xl'>{auth.currentUser?.email}</h1>
         <h1 className='text-xl'>{auth.currentUser?.providerId}</h1>
          <button className='p-2 bg-white rounded-lg text-black' onClick={(e) => {
             e.preventDefault; auth.signOut()
             router.replace('/')
          } }>Log Out</button>
          <button className='p-2 bg-white rounded-lg my-2 text-black' onClick={(e) => {
             e.preventDefault;
             router.push('/profile/students')
          } }>Student Data</button>
       </div>
       </div></>
       )}


    if(!loading && editProfile){
   
   return   (<div className='w-screen min-h-screen flex justify-center items-center z-20'>
      <div className='flex w-fit h-fit flex-col items-center justify-center text-white backdrop-blur-sm'>

      <div className='flex max-w-[600px] w-full flex-col mx-auto justify-center items-center'>

      <div className='text-xl text-white self-end' onClick={(e)=> {e.preventDefault; toggleEditProfile()}}>{editProfile?<BsToggleOn/>:<BsToggleOff/>}</div>

      <form className='flex flex-col text-xl' onSubmit={handleSubmit}>
      <label htmlFor="nameInput">Name:</label>
      <input required={true} id="nameInput" className='rounded-lg my-2 p-2 text-black bg-white/30' type="text" value={name} onChange={handleChange} />
      <button className='p-2 text-black bg-white rounded-lg bg-white/50' type="submit">Update</button>
    </form>
    </div>
    </div></div>)
    }   
}

export default Profile