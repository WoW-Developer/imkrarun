"use client";
import React from "react";

function NormalView({ userData }) {
  console.log("user pic " + userData.photoURL);
  return (
    <div className="bg-white/10 rounded-lg p-4 flex flex-col justify-center items-start">
      <div className="rounded-full h-24 w-24 my-2 overflow-clip">
        <img
          alt="userPicture"
          src={userData.photoURL}
          height={200}
          width={400}
        />
      </div>
      <h1 className="p-2 text-xl">{userData.displayName}</h1>
      <h1 className="p-2 text-xl">{userData.email}</h1>
      <h1 className="p-2 text-xl">{userData.uid}</h1>
    </div>
  );
}

export default NormalView;
