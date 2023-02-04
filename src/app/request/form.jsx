import Link from "next/link";
import React from "react";

const Form = () => {
  return (
    <div className="flex h-full text-white text-start flex-col">
      <Link
        className="self-center text-base bg-blue-600 rounded p-2 m-1"
        href={"/"}
      >
        Requst a Demo
      </Link>
      <Link
        className="self-center text-base bg-blue-600 m-1 rounded p-2"
        href={"/"}
      >
        General Enquiry
      </Link>
    </div>
  );
};

export default Form;
