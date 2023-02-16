import "../app/lib/globals.css";
import Link from "next/link";
import { Raleway } from "@next/font/google";
const google = Raleway({ subsets: ["latin"] });

export default function Error() {
  return (
    <div className={google.className}>
      <div className="w-screen bg-blue-600 text-white dark:text-white text-2xl text-center font-semibold h-screen flex flex-col justify-center items-center">
        <main class="grid min-h-full place-items-center bg-transparent py-24 px-6 sm:py-32 lg:px-8">
          <div class="text-center">
            <p class="text-base font-semibold text-indigo-600">404</p>
            <h1 class="mt-4 text-3xl font-bold tracking-tight  sm:text-5xl">
              Page not found
            </h1>
            <p class="mt-6 text-base leading-7 ">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/"
                class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
