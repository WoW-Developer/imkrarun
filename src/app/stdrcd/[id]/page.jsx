"use client";

import { db } from "@/app/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";

export default function Page({ params }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    name: "",
    class: "",
    group: "",
    board: "",
  });
  //const [id, setId] = useState();
  useEffect(() => {
    const docRef = doc(db, "session-rooms", params.id);
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        //console.log("Document data:", docSnap.data());
        const xata = docSnap.data();
        setData({
          name: xata.name,
          class: xata.class,
          group: xata.group,
          board: xata.board,
        });
        setLoading(false);
      } else {
        // doc.data() will be undefined in this case
        // console.log("No such document!");
      }
    });
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex pt-24 justify-center h-screen w-screen">
        <h1 className=" ">Loading.....</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-col items-center h-screen w-screen">
      <div className="max-w-lg rounded-lg p-4 bg-white/20">
        <div className="flex pointer-events-none flex-col  rounded-md p-4 text-white">
          <h1 className=" text-xl">Name :- {data.name}</h1>
          <h1 className="text-xl ">Class :- {data.class}</h1>
          <h1 className="text-xl ">Group :- {data.group}</h1>
          <h1 className="text-xl ">Board :- {data.board}</h1>
        </div>
        <div className="flex justify-start">
          <div className="rounded-full flex w-fit shadow-sm shadow-black ml-4 p-3 text-center items-center justify-center bg-white text-blue-600">
            <Link href={"stdrcd/" + params.id + "/sessionadd"}>
              <BsFillFileEarmarkPlusFill size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
