import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex fixed top-0 left-0 right-0 py-2 justify-center px-4 text-white bg-black border-b border-black ">
      <div className=" w-full max-w-[800px] justify-between flex-row flex">
        <h1 className="text-2xl">
          <Link href={"/"}>ARUN</Link>
        </h1>
        <ul className="flex align-middle gap-4 items-center text-lg flex-row">
          <li>
            <Link href={"/Services"}>Sevices</Link>
          </li>
          <li>
            <Link href={"/account"}>Login</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
