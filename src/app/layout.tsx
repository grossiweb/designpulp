import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Design Pulp - Interior Design Blog by Balance Design Atlanta",
  description: "Equal parts eye candy and meaty content, Design Pulp is run by Stephanie Andrews, Jennifer Carter and Melody Richardson of Balance Design in Atlanta, GA. Design Pulp aims to share photos, musings, and people that delight and inspire in the world of design and beyond.",
  keywords: "interior design atlanta, design blog atlanta, balance design, interior design blog",
  openGraph: {
    title: "Design Pulp",
    description: "Pithy musings about interior design from Balance Design in Atlanta, GA",
    url: "https://designpulp.net",
    siteName: "Design Pulp",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Pulp",
    description: "Pithy musings about interior design from Balance Design in Atlanta, GA",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
