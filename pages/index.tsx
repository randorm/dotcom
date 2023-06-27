import React from "react";
import TelegramButton from "@/components/TelegramButton";

export default function Login() {
  return (
    <div
      className={`flex flex-col items-center absolute inset-x-0 inset-y-1/3`}
    >
      <img className="mb-7 w-5/12" src="./short-logo-t-b.png" />
      <p className="mb-20 text-black text-opacity-90 text-base font-light">
        Find your best roommates.
      </p>
      <TelegramButton />
      {/* {JSON.stringify(data)} */}
    </div>
  );
}
