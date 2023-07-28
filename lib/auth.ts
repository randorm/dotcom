import { TelegramUser } from "@/components/TelegramButton";

export type TelegramAuthStatus =
  | "ok"
  | "user_not_found"
  | "auth_error"
  | "network_error";

export const authUsingTelegram = async (
  user: TelegramUser,
): Promise<string | undefined> => {
  const res = await fetch("https://api.randorm.com/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (res.status === 200) {
    return await res.text();
  }
  return undefined;
};

export const authUsingTelegramWebApp = async (
  initData: string,
): Promise<string | undefined> => {
  const res = await fetch("https://api.randorm.com/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: initData,
  });

  if (res.status === 200) {
    return await res.text();
  } 
  return undefined;
};
