import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { readSessionCookie } from "@/lib/appwriteServer";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "God's Oracle Ministries",
    template: "%s · God's Oracle Ministries",
  },
  description:
    "God's Oracle Ministries Official Website — glorifying God, making disciples, and serving our community.",
  keywords: [
    "goms",
    "God's Oracle Ministries",
    "GOM System",
    "Goms",
    "GOMS",
    "godsoracle",
    "church",
    "ministries",
  ],
  icons: {
    icon: [{ url: "/images/gomlogo.png", type: "image/png" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await readSessionCookie();

  return (
    <html lang="en" className={cormorant.variable}>
      <body className="antialiased">
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}