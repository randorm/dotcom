import { authUsingTelegramWebApp } from "@/lib/auth";
import React from "react";
import { useLocalStorage } from "usehooks-ts";

export type TelegramWebAppData = {
  initData: string;
  initDataUnsafe: any;
  version: string;
  platform: string;
  colorScheme: string;
  themeParams: any;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  isClosingConfirmationEnabled: boolean;
  BackButton: any;
  MainButton: any;
  HapticFeedback: any;
  setHeaderColor: (color: string | "bg_color" | "secondary_bg_color") => void;
  setBackgroundColor: (
    color: string | "bg_color" | "secondary_bg_color",
  ) => void;
  ready: () => void;
  expand: () => void;
  close: () => void;
};

export type TelegramWebAppContextType = {
  isTelegramWebApp?: boolean;
  data?: TelegramWebAppData;
};

const emptyTelegramWebAppContext: TelegramWebAppContextType = {};

export const TelegramWebAppContext = React.createContext<
  TelegramWebAppContextType
>(
  emptyTelegramWebAppContext,
);

export const TelegramWebAppProvider = (
  { children }: { children: React.ReactNode },
) => {
  const [isTelegramWebApp, setIsTelegramWebApp] = React.useState<
    boolean | undefined
  >(undefined);
  const [data, setData] = React.useState<TelegramWebAppData | undefined>();
  const [authToken, setAuthToken] = useLocalStorage<string | undefined>('token', undefined)

  React.useEffect(() => {
    // @ts-ignore: window.Telegram is injected by Telegram Web App script
    if (window === undefined || window.Telegram === undefined || window.Telegram.WebApp === undefined) {
      // Not web app
      return;
    }
    // @ts-ignore: window.Telegram is injected by Telegram Web App script
    const webapp = window.Telegram.WebApp as TelegramWebAppData;
    setData(webapp);
    setIsTelegramWebApp(!!webapp.initData);

    if (webapp.initData) {
      authUsingTelegramWebApp(webapp.initData as string).then((token) => {
        if (token !== undefined) {
          setAuthToken(token)
        }
      })
    }
  }, []);

  const value: TelegramWebAppContextType = React.useMemo(() => ({
    isTelegramWebApp,
    data,
  }), [isTelegramWebApp, data]);

  return (
    <TelegramWebAppContext.Provider value={value}>
      {children}
    </TelegramWebAppContext.Provider>
  );
};
