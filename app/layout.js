
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientProvider } from "@/components/client-provider";
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DWERP - Enquiry",
  description: "An enquiry system for MSBC",
};

export default function RootLayout({ children }) {

  return (
      <html lang="en">
        <body className={inter.className} style={{ overflow: 'hidden' }}>
            <ClientProvider>
              <Suspense fallback={<Loading />}>
                {children}
              </Suspense>
            </ClientProvider>
            <Toaster />
        </body>
      </html>
  );

}
