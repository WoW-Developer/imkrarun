import "../app/lib/globals.css";
import Link from "next/link";
import { Raleway } from "@next/font/google";
const google = Raleway({ subsets: ["latin"] });

export default function Error() {
  return (
    <div className={google.className}>
      <div className="w-screen bg-blue-600 text-white  text-2xl text-center font-semibold h-screen flex flex-col justify-center items-center">
        <main className="grid min-h-full place-items-center bg-transparent py-24 px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight  sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-6 text-base leading-7 ">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold  shadow-sm hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-black focus-visible:outline-indigo-600"
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
