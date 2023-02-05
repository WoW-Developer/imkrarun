import Link from "next/link";
import Image from "next/image"

export default function Home() {
  return (
    <div className="h-full w-full max-w-[900px] mx-auto">
      {/* 2Cols */}
      <div className=" h-20 sm:h-36">
        <h1></h1>
      </div>
      <div className="flex flex-col-reverse h-full pt-14 p-4 items-center sm:flex-row-reverse">
        {/* 1st Col */}
        <div className="sm:basis-1/2 text-xl sm:text-2xl p-4 text-center items-center flex flex-col self-center">
          <h1>
            Maths doesn&#039;t have to be a mystery! I&#039;m an experienced
            tutor helping students learn and understand the fundamentals of
            maths. Let me help unlock your potential!
          </h1>
          <div className="rounded-md flex bg-blue-600 text-base text-white p-2 m-2">
            <Link href={"/request"}>Book A Demo</Link>
          </div>
          <img className="h-24 w-fit " src="./favicon.png" />
        </div>

        {/* 2nd Col */}

        <div className=" h-full w-full text-center items-center flex flex-col sm:basis-1/2 justify-center overflow-hidden">
         
<div
            className="h-40 sm:h-60 rounded-lg overflow-hidden self-center object-contain"
            src="./hero.png"
          ><Image
      src="/hero.png"
      alt="Sign of the author"
style={{objectFit: "contain"}}
    /> 
</div>
        </div>
        {/* End of 2 Cols */}
      </div>
    </div>
  );
}
