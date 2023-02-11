import React from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "../lib/footer";
const Page = () => {
  return (
    <div className="min-h-screen flex flex-col w-full max-w-[900px] mx-auto">
      <div className="flex flex-col-reverse h-full pt-14 p-4 items-center my-auto sm:flex-row-reverse">
        <div className=" flex flex-col gap-3 items-start p-4 justify-start">
          <h1 className="text-white text-2xl mt-14 self-center p-2">
            What we Offer?
          </h1>
          {/* 1st Div */}
          <div className="flex w-full mt-14 flex-col sm:flex-row">
            <div className="sm:w-1/2 w-full mb-8 sm:mb-0 flex items-center justify-center">
              <Image
                src="/studying.png"
                width="200"
                height="300"
                alt="studious Child"
              />
            </div>
            <div className="w-full sm:w-1/2 p-2 gap-2 self-end h-fit bg-white/10 rounded">
              <div>
                <h1 className="text-white p-1 mb-4 text-right text-xl">
                  One to One Tution 📚
                </h1>
                <h1 className="text-white text-right text-lg">
                  One-to-one tutoring is a personalized educational experience
                  where a student receives individualized attention and
                  instruction from a single teacher. The teacher works with the
                  student in a private setting to address their specific needs,
                  strengths, and weaknesses, and to help them achieve their
                  academic goals.
                </h1>
              </div>
            </div>
          </div>
          {/* 1st Div End */}

          {/* 2nd Div */}
          <div className="flex mt-14 w-full flex-col sm:flex-row-reverse">
            <div className="sm:w-1/2 w-full mb-8 sm:mb-0 flex items-center justify-center">
              <Image
                src="/books.png"
                width="200"
                height="300"
                alt="studious Child"
              />
            </div>
            <div className="w-full sm:w-1/2 p-2 gap-2 self-end h-fit bg-white/10 rounded">
              <div>
                <h1 className="text-white p-1 mb-4 text-left text-xl">
                  Group Tution 📚
                </h1>
                <h1 className="text-white text-left text-lg">
                  Group tutoring is a cost-effective and interactive way of
                  learning that offers students the benefits of personal
                  attention and collaboration with their peers. In a group
                  setting, students can work together to understand difficult
                  concepts, share ideas, and provide each other with support and
                  motivation. With a qualified and experienced tutor leading the
                  sessions, group tutoring can help students build their
                  confidence, improve their problem-solving skills, and achieve
                  their academic goals. Whether you`&apos;`re looking to improve
                  your grades, prepare for an exam, or simply learn something
                  new, group tutoring is a great option to consider.
                </h1>
              </div>
            </div>
          </div>
          {/* 2nd Div End */}

          {/* 3rd Div */}
          <div className="flex mt-14 w-full flex-col sm:flex-row">
            <div className="sm:w-1/2 w-full mb-8 sm:mb-0  flex items-center justify-center">
              <Image
                src="/exam.png"
                width="200"
                height="300"
                alt="studious Child"
              />
            </div>
            <div className="w-full sm:w-1/2 p-2 gap-2 self-end h-fit bg-white/10 rounded">
              <div>
                <h1 className="text-white p-1 mb-4 text-right text-xl">
                  Book a Session Now 📚
                </h1>
                <h1 className="text-white text-right text-lg">
                  Are you looking to experience the benefits of personalized
                  education for yourself or for someone you know? Booking a demo
                  session is a great way to see the impact that one-to-one
                  tutoring or group tutoring can have on a student`&apos;`s
                  academic growth and success. During the demo session, you will
                  have the opportunity to meet with a qualified and experienced
                  tutor who will provide a tailored and interactive educational
                  experience. You will also have the chance to ask questions and
                  get a sense of the tutor`&apos;`s teaching style, as well as
                  the benefits of individualized attention and collaboration. By
                  booking a demo session, you can gain a better understanding of
                  the positive impact that tutoring can have on a
                  student`&apos;`s academic journey and make an informed
                  decision about whether it`&apos;`s the right fit for your
                  needs. So why wait? Book your demo session today and take the
                  first step towards reaching your full potential!
                </h1>
                <div className=" w-full flex justify-end mt-3 p-1">
                  <Link
                    className="bg-red-600/95 hover:bg-red-600 hover:text-white font-semibold rounded-md text-base text-white p-2 "
                    href={"/request"}
                  >
                    Book A Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* 3rd Div End */}

          {/* Last Div */}
          {/* <div className="rounded-md mt-14 mb-12 bg-white/10 p-3 ">
            <div className="flex flex-col text-white m-2 items-center justify-center">
              <h1 className="text-lg sm:text-xl mt-4"></h1>
              <div className="flex flex-row-reverse w-full justify-between">
                <div className="rounded-md flex h-fit self-center bg-red-600 text-base text-white p-2 m-2">
                  <Link href={"/request"}>Book A Demo</Link>
                </div>
                <h1 className="self-center">📚📜📝</h1>
              </div>
            </div>
          </div> */}

          {/* Last Div End */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
