import Link from "next/link";
import Image from "next/image";

export default function FeedDefault() {
    return (
        <>
      <div
        className={`flex flex-col items-center absolute inset-x-0 inset-y-1/3`}
      >
        <Image className="mb-7 w-5/12" src="../short-logo-t-b.png" alt="Logo" />
        <p className="mb-20 text-black text-opacity-90 text-base font-light">
          Find your best 404.
        </p>
      </div>
      <div className="fixed bottom-0 left-0 p-12 text-3xl font-extralight w-96">
        How did you get here? This page doesn’t exist. Back to <Link href="/"><b>homepage</b></Link>
      </div>
    </>
    );
}