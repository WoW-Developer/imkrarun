"use client";
import React, { useEffect, useState } from "react";
import { AiFillCloseSquare} from 'react-icons/ai'
import {BiEraser} from 'react-icons/bi'
import { Roboto_Flex } from "@next/font/google";

import {auth} from '../firebase/firebase'
import { RecaptchaVerifier,signInWithPhoneNumber} from "firebase/auth";

const font = Roboto_Flex({ subsets: ["latin"] });




const Form = () => {

  const [errorvisible,setErrorVisible] = useState(false)
  const [errortext,setErrorText] = useState('');
  const [phone,setPhone] = useState('')
  const [otp,setOTP] =useState('')
 
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
  
  

  const handleInputPHONEChange = (event) => {
    setPhone(event.target.value);
  };
  const handleInputOTPChange = (event) => {
    setPhone(event.target.value);
  };

  const handleOTP = async (event) =>{
    setLoading(true);
    event.preventDefault();
    confirmationResult.confirm(otp).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log('login pass')
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
      console.log(error.message)
    });
    
  }

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const errphone = document.getElementById("errphone");

    if (phone == null || !phone.length == 10) {
      errphone.style.display = "block";
      setLoading(false);
      return;
    }
    errphone.style.display = "none";

    window.recaptchaVerifier = new RecaptchaVerifier('AVC', {}, auth);
    submitPhoneNumberAuth();
  };

  const submitPhoneNumberAuth=(response)=>{
    console.log(response);

    var appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phone, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
    });
  }

  return (
    <div className={`${font.className} p-2 flex flex-grow items-center justify-center`}>

    {/* Error Modal */}

      <div id='erdiv' className="backdrop-blur-sm hidden ease-in-out duration-300 z-50 top-0 justify-center items-center left-0 w-full h-full bg-transparent">
        <div className="flex flex-col relative
       rounded items-center gap-3 content-center bg-red-600 text-white">
        <div className="justify-end  p-1 flex w-full">
        <h1 className="textxl right-0 p-1 text-white top-0" onClick={(e)=>{
          e.preventDefault();
          setErrorVisible(false)
        }}>{<BiEraser size={16}/>}</h1>
        </div>
        <div className="text-center p-2 pt-0 pb-0">
        <h1 className="text2xl">{errortext}</h1>
        <button className="hover:bg-red-900 p-2 rounded-sm" ><AiFillCloseSquare size='30' onClick={()=>setErrorVisible(false)}/></button>
        </div>
        </div>
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


      {/* Form  Phone Sent */}
      <form
        id="formx"
        className="bg-white grow hidden p-4 mx-4 
        rounded-lg shadow-inner outline outline-1 outline-blue-500"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-black font-medium text-md mb-2" htmlFor="phone">
            Phone
          </label>
          <div className="flex border w-full flex-row rounded focus:outline focus:outline-blue-700  border-blue-500 p-2 align-middle">
            <h1 className="self-center pointer-events-none text-gray-400/70">+91</h1>
          <input
            className=" w-full form-input pl-2 outline-none focus:outline-none"
            type="tel"
            id="phone"
            autoComplete="off"
            name="phone"
            value={phone}
            onChange={
              (e)=>{
                e.preventDefault()
                if(!e.target?.value.match('^[0-9]*$')){
                  document.getElementById('erriphone').style.display = "block";
                  return
                }
                document.getElementById('erriphone').style.display = "none";
               
                if(e.target.value.length==11){
                  document.getElementById('erriphone').style.display = "none";
                  return
                }
                handleInputPHONEChange(e)

              }}
              
          />
          </div>
          <h1 id="errphone" className="text-sm text-red-500 hidden pt-1">
            Enter Valid Phone
          </h1>
          <h1 id="erriphone" className="text-sm text-red-500 hidden pt-1">
            Only Numerical Values
          </h1>
        </div>
        <div className="w-full flex justify-center">
          <button className="bg-blue-600 self-center focus:outline focus:outline-blue-600  text-white py-1 px-2 rounded-sm hover:bg-blue-600">
            Submit
          </button>
        </div>
      </form>

       {/* Form  OTP Sub */}
       <form
        id="formOTPx"
        className="bg-white grow hidden p-4 mx-4 
        rounded-lg shadow-inner outline outline-1 outline-blue-500"
        onSubmit={handleOTP}
      >
        <div className="mb-4">
          <label className="block text-black font-medium text-md mb-2" htmlFor="otp">
            OTP
          </label>
          <div className="flex border w-full flex-row rounded focus:outline focus:outline-blue-700  border-blue-500 p-2 align-middle">
          <input
            className=" w-full form-input outline-none focus:outline-none"
            id="otp"
            autoComplete="off"
            name="otp"
            value={otp}
            onChange={
                handleInputOTPChange}
              
          />
          </div>
          <h1 id="errvphone" className="text-sm text-red-500 hidden pt-1">
            Enter Valid OTP
          </h1>
        </div>
        <div className="w-full flex justify-center">
          <button className="bg-blue-600 self-center focus:outline focus:outline-blue-600  text-white py-1 px-2 rounded-sm hover:bg-blue-600">
            Submit
          </button>
        </div>
      </form>


    </div>
  );
};

export default Form;
