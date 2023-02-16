"use client";

import { db } from "@/app/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    name: "",
    class: "",
    group: "",
    board: "",
  });
  const [id, setId] = useState(params.id);
  useEffect(() => {
    const docRef = doc(db, "student", id);
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
  }, [id]);

  if (loading) {
    return (
      <div className="flex pt-24 justify-center h-screen w-screen">
        <h1 className="text-black dark:text-white">Loading.....</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="flex pointer-events-none flex-col bg-blue-600 rounded-md p-4 text-white">
        <h1 className=" text-xl">Name :- {data.name}</h1>
        <h1 className="text-xl ">Class :- {data.class}</h1>
        <h1 className="text-xl ">Group :- {data.group}</h1>
        <h1 className="text-xl ">Board :- {data.board}</h1>
      </div>
    </div>
  );
}
