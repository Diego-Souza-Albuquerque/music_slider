import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music Slider",
  description: "A solução pra quem deseja agilidade em criar slide",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <header className="flex items-center justify-between w-full py-4 px-6">
          <span className="text-2xl font-black cursor-default">
            MUSIC SLIDER
          </span>
          <nav className="flex gap-10">
            <Link href="/">início</Link>
            <Link href="/slider">usar</Link>
            {/* <Link href="/subscribers">inscritos</Link> */}
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
