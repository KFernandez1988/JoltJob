
import { Inter } from "next/font/google";
import Sidebar from "../components/organisms/Sidebar";
import Header from "../components/organisms/Header";
import { Container } from "reactstrap";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JoltJob",
  description: "Your job search companion", 
};

export default function RootLayout({ children }) {



  return (
    <html lang="en">
      <head>
        <title>JoltJob - Your Job Search Companion</title> 
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <meta name="description" content="JoltJob is your ultimate job search companion, offering the latest job listings and resources to help you land your dream job." />
        <meta property="og:title" content="JoltJob - Your Job Search Companion" />
        <meta property="og:description" content="JoltJob is your ultimate job search companion, offering the latest job listings and resources to help you land your dream job." />
        <meta property="og:image" content="/path-to-image.jpg" />
        <meta property="og:url" content="https://your-website-url.com" />
        <meta name="twitter:card" content="summary_large_image" />
        
      </head>
      <body>
       {children}
      
      </body>
    </html>
  );
}
