import React from "react";
import Link from "next/link";
const Page = () => {
  return (
    <div className="min-h-screen flex w-full max-w-[900px] mx-auto">
      <div className="flex flex-col-reverse h-full pt-14 p-4 items-center my-auto sm:flex-row-reverse">
        <h1 className="text-center text-2xl m-2 font-semibold text-black"></h1>
        <div className=" flex flex-col gap-3 items-start text-black p-4 justify-start">
          <div className="rounded-md bg-white shadow-black p-3 shadow-sm">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-lg sm:text-xl">
                Are you looking for a tutor who can help your child excel in
                their studies? My private tuition services provide your child
                with the personalized attention and guidance to ensure they
                reach their academic goals. With a decade of teaching
                experience, I am able to create fun and engaging activities that
                make learning fun and easy. My students have seen increases in
                their grades and confidence, with many of them earning top marks
                in their exams. Contact me today to get your child on the path
                to success!
              </h1>
              <div className="rounded-md flex bg-blue-600 text-base text-white p-2 m-2">
                <Link href={"/request"}>Book A Demo</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
