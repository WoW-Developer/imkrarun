"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Roboto_Flex } from "@next/font/google";
const roboto = Roboto_Flex({ subsets: ["latin"] });

const Page = () => {
  const segments = usePathname();
  const segmentarray = segments.split("/");
  const [allpaths, setAllpaths] = useState();

  const [formData, setFormData] = useState({
    date: "",
    payment: "",
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const ras = [];
    for (let index = 1; index < segmentarray.length; index++) {
      const path = segmentarray[index];
      ras.push(path);
    }
    console.log(ras);
    setAllpaths(ras);
    setLoading(false);
  }, [segmentarray]);
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = () => {};

  if (loading) {
    return (
      <div className="flex pt-24 justify-center h-screen w-screen">
        <h1 className=" ">Loading.....</h1>
      </div>
    );
  }

  return (
    <div className="flex pt-24 justify-center h-screen w-screen">
      <div className={roboto.className}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="relative mb-8">
            <input
              required={true}
              type="date"
              id="date"
              value={formData.date}
              onChange={handleInputChange}
              name="date"
              autoComplete="off"
              placeholder="date"
              className="peer bg-white/10 text-white placeholder:text-white outline-none rounded ring-1 ring-gray-700 p-2"
            />
            <label
              htmlFor="date"
              className="absolute pointer-events-none peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 -top-6 left-1 capitalize text-white peer-placeholder-shown:text-white"
            >
              Date
            </label>
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              id="payment"
              name="payment"
              autoComplete="off"
              required={true}
              value={formData.payment}
              onChange={handleInputChange}
              placeholder="PayMent"
              className="peer bg-white/10 text-white placeholder:text-transparent outline-none rounded ring-1 ring-gray-700 p-2"
            />
            <label
              htmlFor="payment"
              className="absolute pointer-events-none peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 -top-6 left-1 capitalize text-white peer-placeholder-shown:text-white"
            >
              Payment Status{" "}
            </label>
          </div>

          <button
            className="flex self-end bg-red-600 p-1 text-md rounded-md font-semibold"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
