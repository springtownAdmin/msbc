import { Inter } from "next/font/google";
import "./globals.css";
import { ClientProvider } from "@/components/client-provider";
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react";
import Loading from "./loading";
import WebSocketProvider from "@/components/web-socket-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DWERP - Enquiry",
  description: "An enquiry system for MSBC",
};

export default function RootLayout({ children }) {

  return (
      <html lang="en">
        <body style={{ overflow: 'hidden' }}>
            <ClientProvider>
              <Suspense fallback={<Loading />}>
                <WebSocketProvider />
                {children}
              </Suspense>
            </ClientProvider>
            <Toaster />
        </body>
      </html>
  );

}
