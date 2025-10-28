import type { Metadata } from "next";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-bricolage-grotesque",
});

export const metadata: Metadata = {
  title: "Weather App",
  description: "A simple weather application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${bricolageGrotesque.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
