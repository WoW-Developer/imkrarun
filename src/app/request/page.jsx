import Form from "./form";
import Image from "next/image";
export default function Page() {
  return (
    <div className="min-h-screen pt-14 flex-col flex max-w-[800px] mx-auto w-full">
      <div className=" h-full w-full text-center items-center flex justify-center overflow-hidden">
        <Image
          className="h-40 w-full sm:h-60 rounded-lg self-center object-scale-down"
          src="/hero.webp"
          height="200"
          width="300"
          alt="info graphics"
        />
      </div>
      <div className="min-w-full h-36">
        <Form />
      </div>

      {/* End of 2 Cols */}
    </div>
  );
}
