import Link from "next/link";
import Image from "next/image";
import Footer from "./lib/footer";

export default function Home() {
  return (
    <div className=" w-full  h-screen max-w-[810px] p-5 mx-auto">
      {/* 2Cols */}
      <div className="h-14 sm:h-44">
        <h1 className="p-2"></h1>
      </div>
      <div className="flex p-6 bg-white/10 rounded-2xl flex-col-reverse items-center sm:flex-row-reverse">
        {/* 1st Col */}
        <div className="sm:basis-1/2 text-white text-lg sm:text-2xl p-4 text-center items-center flex flex-col self-center">
          <h1>
            Maths doesn&#039;t have to be a mystery! I&#039;m an experienced
            tutor helping students learn and understand the fundamentals of
            maths. Let me help unlock your potential!
          </h1>
        </div>

        {/* 2nd Col */}

        <div className=" h-full rounded-sm  w-full text-center items-center flex flex-col sm:basis-1/2 justify-center overflow-hidden">
          <Image
            className="h-40 sm:h-60 rounded-lg overflow-hidden self-center object-scale-down"
            src="/hero.webp"
            alt="info graphic"
            height="200"
            width="300"
            priority={false}
            style={{ objectFit: "scale-down" }}
          />
        </div>
        {/* End of 2 Cols */}
      </div>
      <h1 className="text-white whitespace-pre-wrap select-none text-xl p-2 mt-28">
        Dear Students / Parents,{"\n"}Are you or your child struggling with
        mathematics and in need of a tutor who can help improve their
        understanding and confidence in the subject?{"\n"}If so, I am here to help! I
        am a highly experienced and qualified mathematics tutor with a passion
        for helping students achieve their full potential. I have a deep
        understanding of mathematical concepts and am able to explain them in a
        clear and concise manner, making it easy for students to understand and
        retain the information. I also believe in creating a positive and
        supportive learning environment that encourages students to ask
        questions and engage with the material. My approach to tutoring is
        tailored to meet the needs of each individual student.{"\n"}I start by
        conducting a thorough assessment of the student&#039;s current knowledge
        and skills, and then create a customized learning plan that is designed
        to help them achieve their goals. Whether you or your child is
        struggling with a specific math topic, preparing for an exam, or just
        looking to improve their overall understanding and confidence, I am here
        to help.{"\n"}So why wait? If you&#039;re ready to take the next step in
        improving your or your child&#039;s math skills, contact me today to
        schedule your first session. I look forward to helping you achieve your
        academic and personal goals!
      </h1>

      <div className="rounded-md w-fit self-center flex bg-red-600/95 hover:bg-red-600 text-base text-white p-2 mt-8 mb-0">
            <Link href={"/request"}>Book A Demo</Link>
          </div>
      <Footer />
    </div>
  );
}
