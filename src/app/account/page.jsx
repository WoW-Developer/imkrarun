import Image from "next/image";
import React from "react";
import Footer from "../lib/footer";
import LoginForm from "../lib/loginform";

const page = () => {
  return (
    <div className="w-full h-screen flex flex-col mx-auto max-w-[600px] justify-center">
      <div className="max-h-screen h-full flex flex-col mt-48 mx-auto max-w-[600px]">
        <div className="flex items-center flex-col rounded-xl p-4 m-4 gap-4 dark:bg-white/10 bg-black/10">
          <div className="h-fit pt-2">
            <Image
              className="h-32 sm:h-32 rounded-lg overflow-hidden self-center object-scale-down"
              src="/office.png"
              alt="info graphic"
              height="200"
              width="300"
              priority={false}
              style={{ objectFit: "scale-down" }}
            />
          </div>
          <div className="self-center">
            <LoginForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
