import Image from "next/image";
import logo from "../public/short-logo-t-b.png";

export default function Loading() {
  return (
    <div className="h-screen w-screen bg-white z-10 flex flex-col justify-center items-center">
      <Image className="mb-6 w-9/12" src={logo} alt="Logo" />
      <p className="text-black text-opacity-90 text-base font-extralight mb-20">
        Find your best roommates.
      </p>
    </div>
  );
}
