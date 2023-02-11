"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillCloseCircle, AiOutlineMenu } from "react-icons/ai";
const NavBar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex fixed top-0 left-0 right-0 py-2 justify-center px-4 text-white shadow shadow-white/30 bg-blue-800 ">
      <div className=" w-full max-w-[800px] justify-between flex-row flex">
        <h1 className="text-2xl self-center hover:bg-white/30 p-1 rounded">
          <Link href={"/"}>ARUN</Link>
        </h1>

        {/* DeskTop Menu */}
        <div className="hidden sm:flex">
          <ul className="flex align-middle gap-4 items-center text-lg flex-row">
            <li>
              <Link className="hover:bg-white/30 text-xl p-2 self-center rounded" href={"/services"}>Sevices</Link>
            </li>
            <li>
              <Link className="hover:bg-white/30 text-xl self-center p-2 rounded" href={"/account"}>Profile</Link>
            </li>
          </ul>
        </div>

        {/* Mobile Nav */}

        <div
          className="self-center sm:hidden z-[30000000]"
          onClick={(e) => {
            e.preventDefault();
            setVisible(!visible);
          }}
        >
          {!visible ? (
            <AiOutlineMenu size={25} />
          ) : (
            <AiFillCloseCircle size={25} />
          )}
        </div>
        <div className={visible ? show : hide}>
          <div className="flex h-full w-full items-center gap-2 text-xl justify-center">
            <ul>
              <li onClick={() => setVisible(!visible)}>
                <Link className="p-2"  href={"/services"}>Services</Link>
              </li>
              <li onClick={() => setVisible(!visible)}>
                <Link  className="p-2"  href={"/account"}>Profile</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const show = `fixed sm:hidden bg-blue-700/80 top-0 left-0 h-full w-full ease-in-out duration-300`;
const hide = `fixed sm:hidden bg-black/80 top-0 -left-full h-full w-full duration-300`;

export default NavBar;
