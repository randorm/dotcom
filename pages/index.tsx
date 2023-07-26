import React from "react";
import Image from 'next/image';
import logo from "../public/short-logo-t-b.png"
import TelegramLoginButton, { TelegramUser } from "@/components/TelegramButton";
import { authUsingTelegram } from "@/lib/auth";
import { useRouter } from "next/router";
import { useLocalStorage } from "usehooks-ts";

interface IUser {
  readonly first_name: string;
  readonly last_name: string;
  readonly id: string;
  readonly username: string;
}
export default function Login() {
  const router = useRouter();
  const [authToken, setAuthToken] = useLocalStorage<string | undefined>('token', undefined)

  const onTelegramAuth = async (user: TelegramUser) => {
    const token = await authUsingTelegram(user);
    setAuthToken(token)

    if (token !== undefined) {
      router.push("https://t.me/randorm_bot/");
    } else {
      router.push("https://t.me/randorm_bot/");
    }
  };
  return (
    <div
      className={`flex flex-col items-center absolute inset-x-0 inset-y-1/3 dark:bg-white`}
    >
      <Image className="mb-7 w-5/12" src={logo} alt="Logo" />
      <p className="mb-20 text-black text-opacity-90 text-base font-light">
        Find your best roommates.
      </p>
      <TelegramLoginButton
        botName="randorm_bot"
        dataOnauth={onTelegramAuth}
      />
    </div>
  );
}
