"use client";
import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    suggestion: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = document.getElementById("name");
    const errname = document.getElementById("errname");
    const mail = document.getElementById("email");
    const errmail = document.getElementById("erremail");
    const phone = document.getElementById("phone");
    const errphone = document.getElementById("errphone");
    const suggestion = document.getElementById("name");
    const errsuggestion = document.getElementById("errname");

    if (formData.name == null || formData.name.length == 0) {
      errname.style({ display: "block" });
      return;
    }
    errname.style({ display: "none" });

    if (formData.mail == null || formData.email.length == 0) {
      errmail.style({ display: "block" });
    }
    errmail.style({ display: "none" });
    if (formData.phone == null || formData.phone.length == 0) {
      errphone.style({ display: "block" });
    }
    errphone.style({ display: "none" });

    // Submit form data to API
  };

  return (
    <div className="p-4 m-8">
      <form
        className="bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-black font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            autoComplete="off"
            className="w-full focus:outline focus:outline-blue-500 form-input border rounded border-gray-300 p-2"
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
            className="w-full form-input border rounded focus:outline focus:outline-blue-500   border-gray-300 p-2"
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
            className="w-full border form-input rounded focus:outline focus:outline-blue-500  border-gray-300 p-2"
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
