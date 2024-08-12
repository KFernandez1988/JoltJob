import { Inter } from "next/font/google";
import { Link } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JoltJob",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>
        
        {children}</body>
    </html>
  );
}
