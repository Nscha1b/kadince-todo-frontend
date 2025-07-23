import type { Metadata } from "next";
import { Inter, Indie_Flower } from "next/font/google";
import "./globals.css";

const interSans = Inter({
    variable: "--font-inter-sans",
    subsets: ["latin"],
});

const indieFlower = Indie_Flower({
    variable: "--font-indie-flower",
    subsets: ["latin"],
    weight: "400",
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "a todo application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} ${indieFlower.variable} antialiased`}
      >
        <div
          className="max-w-[1300px] mx-auto px-2 md:px-8 lg:px-12 xl:px-16 2xl:px-20"
          >
          {children}
        </div>
      </body>
    </html>
  );
}
