"use client";
import { db } from "../../firebase/firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    class: "",
    group: "",
    board: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    addDoc(
      collection(db, "student"),
      {
        name: formData.name,
        class: formData.class,
        group: formData.group,
        board: formData.board,
      },
      { merge: true }
    )
      .then(function (docRef) {
        //console.log("Document written with ID: ", docRef.id);

        setDoc(
          doc(db, "student", "allstudents"),
          {
            name: arrayUnion(formData.name + "--" + docRef.id),
            class: arrayUnion(formData.class + "--" + docRef.id),
            board: arrayUnion(formData.board + "--" + docRef.id),
          },
          { merge: true }
        )
          .then(function (docR) {
            setLoading(false);
            //console.log("Document written data ", docR);
            router.back();
          })
          .catch(function (err) {
            setLoading(false);
            console.error("Error adding document: ", err);
          });
      })
      .catch(function (error) {
        setLoading(false);
        console.error("Error adding document: ", error);
      });
    //console.log(formData);
  };

  if (!loading) {
    return (
      <div className="w-screen min-h-screen flex flex-col justify-center items-center">
        <div className="min-h-[100px]"></div>
        <h1 className="text-black m-4 text-xl font-semibold">
          Enter New Student Data
        </h1>
        <div className="w-full max-w-[600px]">
          <div
            className="bg-white/10 dark:bg-black shadow shadow-black dark:shadow-white/10 w-full flex flex-col p-4 pb-2 mb-14 mx-4 
        rounded-lg outline outline-0 outline-white text-black dark:text-white"
          >
            <div className="mb-4">
              <label
                className="block text-black dark:text-white font-medium mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                autoComplete="off"
                className="w-full starlabel focus:outline bg-transparent focus:outline-white/80 form-input border rounded dark:border-white/20 border-black/20 p-2"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <h1 id="errname" className="text-sm text-red-600 hidden pt-1">
                Student Name
              </h1>
            </div>
            <div className="mb-4">
              <label
                className="block text-black dark:text-white font-medium mb-2"
                htmlFor="class"
              >
                Class
              </label>
              <input
                autoComplete="off"
                className="w-full starlabel focus:outline bg-transparent focus:outline-white/80 form-input border rounded dark:border-white/20 border-black/20 p-2"
                type="text"
                id="class"
                name="class"
                value={formData.class}
                onChange={handleInputChange}
              />
              <h1 id="errname" className="text-sm text-red-600 hidden pt-1">
                Class
              </h1>
            </div>
            <div className="mb-4">
              <label
                className="block text-black dark:text-white font-medium mb-2"
                htmlFor="group"
              >
                Class Group
              </label>
              <select
                className="w-full starlabel bg-transparent  form-input border rounded focus:outline focus:outline-white/80 dark:border-white/20 border-black/20 p-2"
                type="text"
                autoComplete="off"
                id="group"
                name="group"
                value={formData.group}
                onChange={handleInputChange}
              >
                <option defaultValue="" value="">
                  Choose..
                </option>
                <option value="primary">upto 5th</option>
                <option value="junior">6th-8th</option>
                <option value="highschool">9th-10th</option>
                <option value="senior">11th-12th</option>
              </select>
              <h1 id="errorclass" className="text-sm text-red-600 hidden pt-1">
                Select Class Group
              </h1>
            </div>
            <div className="mb-4 group">
              <label
                className="block text-black dark:text-white font-medium mb-2"
                htmlFor="board"
              >
                Board
              </label>
              <div className="flex border w-full group-focus:outline-white/80  border-black/20 dark:border-white/20 flex-row rounded focus:outline  p-2 align-middle">
                <select
                  className=" w-full bg-transparent form-input pl-2 outline-none group-hover:outline-none"
                  type="text"
                  id="board"
                  autoComplete="off"
                  name="board"
                  value={formData.phone}
                  onChange={handleInputChange}
                >
                  <option defaultValue="" value="">
                    Choose Board
                  </option>
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="STATE BOARD">STATE BOARD</option>
                </select>
              </div>
              <h1 id="errboard" className="text-sm text-red-600 hidden pt-1">
                Select Board Name
              </h1>
            </div>

            <div className="w-full flex justify-center">
              <button
                onClick={handleSubmit}
                className="bg-red-600/95 rounded-md self-center focus:outline focus:outline-blue-600  text-white py-2 px-4  hover:bg-red-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
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
