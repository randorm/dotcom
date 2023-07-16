import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="frame-src https://oauth.telegram.org"
        />
        <Script src="https://telegram.org/js/telegram-web-app.js"></Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
