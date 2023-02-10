'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillCloseCircle, AiOutlineMenu } from "react-icons/ai";
const NavBar = () => {
  const [visible,setVisible] = useState(false);
  

  return (
    <div className="flex fixed top-0 left-0 right-0 py-2 justify-center px-4 text-white bg-blue-800 border-b border-black ">
      <div className=" w-full max-w-[800px] justify-between flex-row flex">
        <h1 className="text-2xl">
          <Link href={"/"}>ARUN</Link>
        </h1>

      {/* DeskTop Menu */}
        <div className="hidden sm:flex">
        <ul className="flex align-middle gap-4 items-center text-lg flex-row">
          <li>
            <Link href={"/services"}>Sevices</Link>
          </li>
          <li>
            <Link href={"/account"}>Profile</Link>
          </li>
        </ul>
        </div>
      
      {/* Mobile Nav */}

      <div className="self-center sm:hidden z-[30000000]" onClick={e=>{e.preventDefault(); setVisible(!visible)}}>{!visible? <AiOutlineMenu size={25}/>:<AiFillCloseCircle size={25}/>}</div>
      <div className={visible?show:hide}>
        <div className="flex h-full w-full items-center gap-2 text-xl justify-center">
            <ul>
              <li className="p-2" onClick={()=>setVisible(!visible)}><Link href={'/services'}>Services</Link></li>
              <li className="p-2" onClick={()=>setVisible(!visible)}><Link href={'/account'}>Profile</Link></li>
            </ul>
        </div>
        </div>      
      </div>
    </div>
  );
};

const show=`fixed sm:hidden bg-blue-700/80 top-0 left-0 h-full w-full ease-in-out duration-300`
const hide=`fixed sm:hidden bg-black/80 top-0 -left-full h-full w-full duration-300`

export default NavBar;
