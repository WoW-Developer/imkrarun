"use client";

export default function Page({ params }) {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <h1 className="text-black dark:text-white">{params.id}</h1>
    </div>
  );
}
