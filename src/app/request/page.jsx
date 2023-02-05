import Form from "./form";
import Image from "next/image"
export default function Page() {
  return (
    <div className="min-h-screen flex w-full">
      <div className="h-full w-full flex max-w-[900px] overflow-auto my-auto mx-auto">
        {/* 2Cols */}
        <div className="flex mx-auto flex-col-reverse h-full pt-14 p-4 items-center sm:flex-row-reverse">
          {/* 1st Col */}
          <div className="sm:basis-1/2 text-xl sm:text-2xl p-4 text-center items-center flex flex-col self-center">
            <Form />
          </div>

          {/* 2nd Col */}

          <div className=" h-full w-full text-center items-center flex flex-col sm:basis-1/2 justify-center overflow-hidden">
            <div
              className="h-40 sm:h-60 rounded-lg self-center object-scale-down"
         
            >
<Image
      src="/hero.png"
      alt="info graphics"
fill={true}
    /> </div>
          </div>
          {/* End of 2 Cols */}
        </div>
      </div>
    </div>
  );
}
