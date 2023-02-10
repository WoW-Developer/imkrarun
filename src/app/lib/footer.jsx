import React from "react";
import { RiCopyrightLine } from "react-icons/ri";

import { Roboto_Flex } from "@next/font/google";

const roboto = Roboto_Flex({ subsets: ["latin"] });

const Footer = () => {
  return (
    <div className={roboto.className}>
      <div
        className={
          "w-full flex mt-14 flex-row justify-start items-center border-t-[1px] border-cyan-500/30 bg-blue-800"
        }
      >
        <RiCopyrightLine className="text-white my-2 ml-2 mr-1 text-sm" />
        <h1 className="text-white text-sm uppercase py-2">2023 Arun</h1>
      </div>
    </div>
  );
};

export default Footer;
