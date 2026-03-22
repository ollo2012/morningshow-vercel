import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Oswald } from "next/font/google";
import "./globals.css";
// Import the AuthProvider you created
import { AuthProvider } from "./context/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const oswald = Oswald({
  variable: "--font-jazz-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Morningshow – Bäckerei Briefing",
  description: "Tägliches Morgenbriefing für das Bäckerei-Team",
  icons: {
    icon: "/logos/BAEKO-Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Wrapping children in AuthProvider enables 
            useSession() and getServerSession() throughout the app 
        */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}