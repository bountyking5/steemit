"use client" ;
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/libs/reduxToolkit/store";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        
      <Provider store={store}>
        {children}
        </Provider>
      </body>
    </html>
  );
}
