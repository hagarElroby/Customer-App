import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Dizzly",
  description:
    "Dizzly is a modern online auction and marketplace platform where users can buy, sell, and bid on products in real time. Discover unique items, competitive deals, and a seamless shopping experience.",
  icons: {
    icon: "/images/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <link
          rel="icon"
          href="/images/favIcon.svg"
          type="image/png"
          sizes="32x32"
        />
      </head>
      <body>
        <Providers>
          <Toaster
            position="top-right"
            duration={4000}
            richColors
            closeButton
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
