"use client";
import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  onAuthStateChanged,
  indexedDBLocalPersistence,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { BsGoogle } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../firebase/firebase";

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
  login_hint: "WoW",
});

const Form = () => {
  const router = useRouter();
  const [errorvisible, setErrorVisible] = useState(false);
  const [errortext, setErrorText] = useState("");
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
        //console.log(user);
        // ...
      } else {
        setUser("");
      }
    });
  });
  useEffect(() => {
    const spin = document?.getElementById("spinner");
    const frm = document?.getElementById("formx");
    if (loading) {
      spin.style.display = "block";
      frm.style.display = "none";
    } else {
      frm.style.display = "block";
      spin.style.display = "none";
    }
  }, [loading]);

  useEffect(() => {
    const erdiv = document?.getElementById("erdiv");
    if (errorvisible) {
      erdiv.style.position = "fixed";
      document.body.style.overflow = "hidden";
      erdiv.style.display = "flex";
    } else {
      document.body.style.overflow = "auto";
      erdiv.style.display = "none";
    }
  }, [errorvisible]);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    if (auth.currentUser == null)
      setPersistence(auth, indexedDBLocalPersistence)
        .then(async () => {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          try {
            setLoading(true);
            const result = await signInWithPopup(auth, provider);
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const uid = result.user.uid;
            if (sessionStorage.getItem("type") == "redirect") {
              sessionStorage.removeItem("type");
              router.push("/request");
              setLoading(false);
              return;
            }
            window.localStorage.setItem("user", "user");
            setLoading(false);
          } catch (error) {
            setLoading(false);
            // Handle Errors here.
            //const errorCode = error.code;
            //const errorMessage = error.message;
            // setRealError(errorMessage);
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential_1 = GoogleAuthProvider.credentialFromError(error);
            setErrorText(error.message);
            setErrorVisible(true);
          }
        })
        .catch((error) => {
          setLoading(false);
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorText(errorMessage);
          setErrorVisible(true);
        });
    else if (auth.currentUser != null) {
      signOut(auth)
        .then(() => {
          window.localStorage.setItem("user", "no");
          setLoading(false);
        })
        .catch((error) => {
         // console.log(error);
        });
    }
  };

  return (
    <>
      <div className="p-2 z-30 flex flex-grow items-center justify-center">
        {/* Error Modal */}

        <div
          id="erdiv"
          className="backdrop-blur-sm p-2 hidden ease-in-out duration-300 z-50 top-0 justify-center items-center left-0 w-full h-full bg-transparent"
        >
          <div
            className="flex flex-col relative
       rounded-md items-center gap-3 content-center p-4 bg-blue-600/80 text-white"
          >
            <div className="text-center flex flex-col items-center justify-center p-2 pt-0 pb-0">
              <Image src="/error.png" height="100" width="120" alt="error" />
              <h1 className="text2xl mt-4">{errortext}</h1>
              <button className="hover:rotate-[-180deg] duration-300 p-2 rounded-full">
                <IoCloseCircleSharp
                  className="rounded-full"
                  size="44"
                  onClick={() => setErrorVisible(false)}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Spinner */}
        <div id="spinner" role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <h1 className="sr-only">Loading...</h1>
        </div>

        {/* Form Login */}
        <form
          id="formx"
          className="grow hidden px-4 mx-4"
          onSubmit={handleSubmit}
        >
          <div className="bg-blue-600/95 peer rounded-lg py-1 px-4 m-1 hover:bg-blue-600 w-full flex flex-row justify-center">
            <div className="self-center text-white">
              <BsGoogle />
            </div>
            <button className=" self-center font-semibold focus:outline-none text-white py-1 pl-2 rounded-sm ">
              {!user ? "Login" : "Log-out"}
            </button>
          </div>

          <Link
            className={
              `${user}`
                ? "rounded-lg m-1 text-center bg-blue-600 text-white font-semibold py-2 px-4 w-full flex flex-col flex-nowrap justify-center"
                : "hidden"
            }
            href={"/account/update"}
            prefetch={false}
          >
            Profile Update
          </Link>
          <Link
            className={
              `${user}`
                ? "rounded-lg m-1 text-center bg-blue-600 text-white font-semibold py-2 px-4 w-full flex flex-col flex-nowrap justify-center"
                : "hidden"
            }
            href={"/stdrcd"}
            prefetch={false}
          >
            Students Record
          </Link>
        </form>
      </div>
    </>
  );
};

export default Form;
