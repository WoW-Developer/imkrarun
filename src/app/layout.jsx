import "./lib/globals.css";
import { Raleway } from "@next/font/google";
import NavBar from "./lib/NavBar";
// const raleway = Raleway({ subsets: ["latin"] });
const google = Raleway({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="h-full w-full ">
        <div className={google.className}>
          <div className="flex flex-col">
            <NavBar />
            {/* <div className="w-20 mt-12 fixed top-0 left-0 bottom-0 bg-amber-600"></div> */}
            <div>
                {children}
                            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
