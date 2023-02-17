"use client";

import { useEffect, useState } from "react";
import { AiFillCloseCircle, AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setUser(true);
      setLoading(false);

      //console.log(user);
      // ...
    } else {
      setUser(false);
      setLoading(false);
    }
  });

  return (
    <div className="flex fixed top-0 left-0 right-0 py-2 justify-center px-4 text-black dark:text-white shadow dark:shadow-white/20 shadow-black/20 dark:bg-black bg-white ">
      <div className=" w-full max-w-[800px] justify-between flex-row flex">
        <h1 className="text-2xl self-center">
          <Link className="hover:bg-black/30 p-2 self-center rounded" href="/">
            ARUN
          </Link>
        </h1>

        {/* DeskTop Menu */}
        <div className="hidden sm:flex">
          <ul className="flex align-middle gap-4 items-center text-lg flex-row">
            <li>
              <Link
                className="hover:bg-black/30 text-xl p-2 self-center rounded"
                href="services"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                className={
                  !loading
                    ? "hover:bg-black/30 text-xl p-2 self-center rounded"
                    : "hidden hover:bg-black/30 text-xl p-2 self-center rounded"
                }
                href="account"
              >
                {user ? 'Profile': 'Login'}
              </Link>
            </li>
            <li>
              <Link
                className="hover:bg-black/30 text-xl p-2 self-center rounded"
                href="stu"
              >
                Student Zone
              </Link>
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
            <AiFillCloseCircle className="text-white" size={25} />
          )}
        </div>
        <div className={visible ? show : hide}>
          <div className="flex h-full w-full items-center text-xl justify-center">
            <ul>
              <li
                className="p-1 m-1 rounded text-center  text-xl text-white"
                onClick={() => setVisible(!visible)}
              >
                <Link href={"services"}>Services</Link>
              </li>
              <li
                className="p-1 m-1 text-center rounded  text-xl text-white "
                onClick={() => setVisible(!visible)}
              >
                <Link className="p-2" href={"account"}>
                  {user ? 'Profile' : 'Login'}
                </Link>
              </li>
              <li
                className="p-1 m-1 text-center rounded  text-xl text-white "
                onClick={() => setVisible(!visible)}
              >
                <Link
                  className="p-2"
                  href={"stu"}
                  prefetch={false}
                >
                  Student Zone
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const show = `fixed sm:hidden bg-black/95 top-0 left-0 h-full w-full ease-in-out duration-300`;
const hide = `fixed sm:hidden bg-black/80 top-0 -left-full h-full w-full duration-300`;

export default NavBar;
