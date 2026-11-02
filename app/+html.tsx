import { themeBootScript, themeCss } from "@/constants/theme";
import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

// Root HTML for the static web export.
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="CS @ Berkeley" />
        <meta name="theme-color" content="#FAFAFA" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Link previews (iMessage, Slack, LinkedIn, X) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://henrybonomolo.com/" />
        <meta property="og:site_name" content="Henry Bonomolo" />
        <meta property="og:title" content="Hi, I'm Henry" />
        <meta property="og:description" content="CS @ Berkeley" />
        <meta property="og:image" content="https://henrybonomolo.com/og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Hi, I'm Henry. CS @ Berkeley." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hi, I'm Henry" />
        <meta name="twitter:description" content="CS @ Berkeley" />
        <meta name="twitter:image" content="https://henrybonomolo.com/og.jpg" />

        {/* Fonts: connect early so text renders in Geist sooner */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <ScrollViewStyleReset />
        <style id="theme-css" dangerouslySetInnerHTML={{ __html: themeCss }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
