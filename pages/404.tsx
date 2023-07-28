import Image from "next/image";
import logo from "../public/short-logo-t-b.png"
import Link from "next/link";

export default function Error404() {
  return (
    <>
      <div
        className={`flex flex-col items-center absolute inset-x-0 inset-y-1/3 dark:bg-white`}
      >
        <Image className="mb-7 w-5/12" src={logo} alt="Logo" />
        <p className="mb-20 text-black text-opacity-90 text-base font-light">
          Find your best 404.
        </p>
      </div>
      <div className="fixed bottom-0 left-0 p-12 text-3xl font-extralight w-96 dark:bg-white">
        How did you get here? This page doesn’t exist. Back to <Link href="/"><b>homepage</b></Link>
      </div>
    </>
  );
}
