"use client";
import React, { useEffect, useRef, useState } from "react";
import {AiFillCloseCircle} from 'react-icons/ai'




const Form = () => {
  const errorRef = useRef(null);
  const [errorvisible,setErrorVisible] = useState(false)

  const [errortext,setErrorText] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    suggestion: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const spin = document?.getElementById("spinner");
    const frm = document?.getElementById("formx");
    if (loading) {
      spin.style.display = "block";
      frm.style.display = "none";
    } else {
      frm.style.display = "block";
      spin.style.display = "none";
    }
  }, [loading]);


  useEffect(() => {
    const erdiv = document?.getElementById("erdiv");
    if (errorvisible) {
      erdiv.style.position='fixed'
      document.body.style.overflow='hidden'
      erdiv.style.display = "flex";
    } else {
      document.body.style.overflow='auto'
      erdiv.style.display = "none";
    }

  }, [errorvisible])
  
  
  const showErrorModal =(response)=>{
    if(response.status==410){
      setErrorText(response.statusText);
      setErrorVisible(true);
      return
    }
    if(response.status==404){
      setErrorText(response.statusText);
      setErrorVisible(true);
      return
    }
    if(response.status==420){
      setErrorText(response.statusText);
      setErrorVisible(true);
      return
    }
    if(response.status==430){
      setErrorText(response.statusText);
      setErrorVisible(true);
      return
    }
  }

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const clearform =  ()=>{
    setFormData({   name: "",
         email: "",
         phone: "",
         suggestion: "",});
  } 

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    
    const errname = document.getElementById("errname");
    const errmail = document.getElementById("erremail");
    const errphone = document.getElementById("errphone");

    if (formData.name == null || formData.name.length == 0) {
      errname.style.display = "block";
      setLoading(false);
      return;
    }
    errname.style.display = "none";

    if (formData.email == null || formData.email.length == 0) {
      errmail.style.display = "block";
      setLoading(false);
      return;
    }
    errmail.style.display = "none";

    if (formData.phone == null || formData.phone.length < 10 || formData.phone.length == 0) {
      errphone.style.display = "block";
      setLoading(false);
      return;
    }
    errphone.style.display = "none";

    await fetch("/api/subdmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "name": formData.name,
        "email": formData.email,
        "phone": formData.phone,
        "suggestion": formData.suggestion ? formData.suggestion : "N/A",
      }),
    })
      .then((ress) => {
        setLoading(false)
        showErrorModal(ress);
         return
      })
      .catch((errr) => {
        console.log(errr);
        return
      });

   
  };

  return (
    <div className="p-4 m-8 flex flex-grow items-center justify-center">

    {/* Error Modal */}

      <div id='erdiv' className="flex fixed flex-col top-1/2 
       rounded p-3 items-center gap-3 content-center bg-red-600 text-white">
        <h1 className="text2xl">{errortext}</h1>
        <button className="hover:bg-red-500/40" ><AiFillCloseCircle size='30' onClick={()=>setErrorVisible(false)}/></button>
      </div>
      {/* Spinner */}
      <div id="spinner" role="status">
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
      <form
        id="formx"
        className="bg-white grow hidden p-6 mb-14 mx-4 
        rounded-lg shadow-inner"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-black font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            autoComplete="off"
            className="w-full starlabel focus:outline focus:outline-blue-500 form-input border rounded border-gray-300 p-2"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <h1 id="errname" className="text-sm text-red-500 hidden pt-1">
            Enter Name
          </h1>
        </div>
        <div className="mb-4">
          <label className="block text-black font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full starlabel  form-input border rounded focus:outline focus:outline-blue-500   border-gray-300 p-2"
            type="email"
            autoComplete="off"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <h1 id="erremail" className="text-sm text-red-500 hidden pt-1">
            Enter Valid Email
          </h1>
        </div>
        <div className="mb-4">
          <label className="block text-black font-medium mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            className="w-full starlabel border form-input rounded focus:outline focus:outline-blue-500  border-gray-300 p-2"
            type="tel"
            id="phone"
            autoComplete="off"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <h1 id="errphone" className="text-sm text-red-500 hidden pt-1">
            Enter Valid Phone
          </h1>
        </div>
        <div className="mb-4">
          <label
            className="block text-black font-medium mb-2"
            htmlFor="suggestion"
          >
            Suggestion
          </label>
          <textarea
            className="w-full border focus:outline focus:outline-blue-500  resize-none h-40 rounded form-input border-gray-300 p-2"
            id="suggestion"
            name="suggestion"
            autoComplete="off"
            value={formData.suggestion}
            onChange={handleInputChange}
          />
          <h1
            id="errsuggestion"
            className="text-sm text-red-500 block pt-1"
          ></h1>
        </div>
        <div className="w-full flex justify-center">
          <button className="bg-blue-500 self-center focus:outline focus:outline-blue-500  text-white py-2 px-4 rounded-full hover:bg-blue-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
