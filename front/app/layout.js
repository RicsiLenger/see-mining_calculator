import { Inter } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Clinton Mining co.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="${inter.className}">
        {children}
      </body>
    </html>
  )
}
