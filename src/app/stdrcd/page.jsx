"use client";

import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiViewList } from "react-icons/hi";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
          for (let index = 0; index < xata.docid.length; index++) {
            const ax = {
              name: xata.name[index],
              docid: xata.docid[index],
              class: xata.class[index],
            };
            dxta.push(ax);
          }
          setxData(dxta);
          setLoading(false);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          setxData(null);
          setLoading(false);
        }
      } else {
        console.error("User Absent");
        router.replace("/account");
      }
    });

    return () => {};
  }, [router]);

  if (!loading)
    return (
      <div className="p-2 h-screen w-screen justify-center flex items-center">
        <div className=" overflow-auto ">
          <div className="text-black dark:text-white">
            <table className="table-auto border-collapse border border-slate-500">
              <thead>
                <tr>
                  <th className=" text-center p-4 border-slate-600 rounded-tl border-2">
                    Name
                  </th>
                  <th className="text-center p-4 border-slate-600 border-2">
                    Class
                  </th>
                  <th className="  text-center p-4 border-slate-600 border-2">
                    Doc-ID
                  </th>
                  <th className=" text-center p-4 border-slate-600 border-2 rounded-tr"></th>
                </tr>
              </thead>

              <tbody>
                {xdata.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td className=" text-center p-4 border-slate-600 border-2">
                        {data.name}
                      </td>
                      <td className="text-center p-4 border-slate-600 border-2">
                        {data.class}
                      </td>
                      <td className="text-center p-4 border-slate-600 border-2">
                        {data.docid}
                      </td>
                      <td className=" text-center p-4 border-slate-600 border-2">
                        {
                          <Link href={"/stdrcd/" + data.docid}>
                            <HiViewList
                              className="text-black dark:text-white"
                              size={20}
                            />
                          </Link>
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          ;
        </div>
      </div>
    );

  return spinner;
};

export default Page;

const spinner = (
  <div className="h-screen w-full flex flex-col">
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
