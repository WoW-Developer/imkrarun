"use client";

import { useEffect, useState } from "react";
import { AiFillCloseCircle, AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase/firebase";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const [xuser, setUser] = useState("Login");

  const router = useRouter();

  const loginbuttonclick = () => {
    if(auth.currentUser!=null){
      router.push('/profile')
      return
    }
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      const n = user.displayName;
        const a = n.split(" ");
        setUser('Hi, '+a[0]);
        toast.success(xuser,{position:'top-left'})
        router.push('/profile')

      // IdP data available using getAdditionalUserInfo(result)
    }).catch((error) => {
      
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage,{position:'top-left'})
      // The email of the user's account used.
      
      //const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const n = user.displayName;
        const a = n.split(" ");
        setUser('Hi, '+a[0]);
      } else {
        setUser("Login");
      }
    });
  });

  return (
    <div className="flex fixed top-0 left-0 right-0 py-2 justify-center px-4 shadow bg-blue-600  shadow-black/20   ">
      <div><Toaster/></div>
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
              <h1
                className="hover:bg-black/30 text-xl p-2 self-center rounded"
                onClick={(e) => {e.preventDefault();
              loginbuttonclick()} }
              >
                {xuser}
              </h1>
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
              <li>
              <h1
                className="hover:bg-black/30 text-xl p-2 self-center rounded"
                onClick={(e) => {
                  e.preventDefault();
                  setVisible(!visible)
              loginbuttonclick()} }
              >
                {xuser}
              </h1>
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
