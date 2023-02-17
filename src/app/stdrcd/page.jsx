"use client";

import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { FiEdit } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [EmptyDoc, setEmptyDoc] = useState(false);
  const [xdata, setxData] = useState({ name: "", docid: "", class: "" });

  useEffect(() => {
    const studentRef = doc(db, "student", "allstudents");

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docSnap = await getDoc(studentRef, auth);
        if (docSnap.exists()) {
          // console.log(docSnap.data());

          const xata = docSnap.data();
          const dxta = [];
          for (let index = 0; index < xata.name.length; index++) {
            const nmAr = xata.name[index].split("--");
            const nmAry = nmAr[0];
            const nmID = xata.board[index].split("--");
            const nmAID = nmID[0];
            const nmCL = xata.class[index].split("--");
            const nmACl = nmCL[0];
            const nmDID = nmCL[1];
            const ax = {
              name: nmAry,
              board: nmAID,
              class: nmACl,
              docid: nmDID,
            };
            dxta.push(ax);
          }
          setxData(dxta);
          setEmptyDoc(false);
          setLoading(false);
        } else {
          // doc.data() will be undefined in this case
          //console.log("No such document!");
          setEmptyDoc(true);
          setLoading(false);
        }
      } else {
        console.error("User Absent");
        router.replace("/account");
      }
    });

    return () => {};
  }, [router]);

  if (!loading && EmptyDoc) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="fixed bottom-9 right-5">
          <div className="rounded-full shadow-sm shadow-black p-3 text-center items-center justify-center bg-blue-600 text-white">
            <Link href={"stdrcd/dataentry"}>
              <FiEdit size={25} />
            </Link>
          </div>
        </div>
        <div>
          <h1 className="text-black text-xl dark:text-white">
            No Records Found
          </h1>
        </div>
      </div>
    );
  }

  if (!loading && !EmptyDoc)
    return (
      <div className="p-2 h-screen w-screen justify-center flex items-center">
        <div className="fixed bottom-9 right-5">
          <div className="rounded-full shadow-sm shadow-black p-3 text-center items-center justify-center bg-blue-600 text-white">
            <Link href={"stdrcd/dataentry"}>
              <FiEdit size={25} />
            </Link>
          </div>
        </div>
        <div className=" overflow-auto ">
          <div className="grid py-14 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-content-center w-fit mx-auto max-w-screen-lg gap-2">
            {xdata.map((data, index) => {
              return (
                <div
                  key={index}
                  className="card card-compact w-full bg-base-100 shadow-xl"
                >
                  <div className="block p-6 rounded-lg shadow-lg bg-blue-600 max-w-sm">
                    <h5 className="text-white text-xl leading-tight font-medium mb-4">
                      {data.name}
                    </h5>
                    <p className="text-white/90 text-base mb-2">
                      Class:- {data.class}
                    </p>
                    <p className="text-white/90 text-base mb-2">
                      Board :- {data.board}
                    </p>
                    <button type="button">
                      <Link
                        className=" inline-block px-6 py-2.5 bg-white text-blue-600 font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"
                        href={"/stdrcd/" + data.docid}
                      >
                        Details
                      </Link>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          ;
        </div>
      </div>
    );

  return spinner;
};

export default Page;

const spinner = (
  <div className="h-screen w-full  flex flex-col">
    <div className=" w-screen max-h-36 h-1/3">
      <h1></h1>
    </div>
    <div className="w-screen justify-center flex">
      <div>
        <svg
          aria-hidden="true"
          className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <h1 className="sr-only">Loading...</h1>
      </div>
    </div>
  </div>
);
