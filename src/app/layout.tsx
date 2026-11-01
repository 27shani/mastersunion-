import type { Metadata } from "next";
import { Geist, Pinyon_Script } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import CheckoutSheet from "@/components/CheckoutSheet";
import ChatWidget from "@/components/ChatWidget";
import { CheckoutProvider } from "@/context/CheckoutContext";

const script = Pinyon_Script({ variable: "--font-script", subsets: ["latin"], weight: "400" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Master's Union Merch Store | Official Merchandise",
    template: "%s | Master's Union Merch",
  },
  description:
    "Official Master's Union merchandise. Premium campus streetwear, hoodies, tees, accessories and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${script.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-canvas text-neutral-900">
        <StoreProvider>
          <CheckoutProvider>
            <AnnouncementBar />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CheckoutSheet />
            <ChatWidget />
          </CheckoutProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
