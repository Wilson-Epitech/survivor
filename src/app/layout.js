import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Soul Connexion",
  description: "",
};

export default function RootLayout({ children })
{
  return (
    <html>
      <body>
        {/* <div className="bg-white min-h-screen flex"> */}
            {children}
        {/* </div> */}
      </body>
    </html>
  );
}
