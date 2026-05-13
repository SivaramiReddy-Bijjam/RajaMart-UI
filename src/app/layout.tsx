import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RajaMart Electronics & Furniture | Darsi",
  description:
    "Premium electronics and furniture showroom in Darsi, Andhra Pradesh. Shop mobiles, TVs, refrigerators, sofas, washing machines, ACs, laptops and more.",
  keywords: [
    "RajaMart",
    "electronics store Darsi",
    "furniture showroom Darsi",
    "mobiles Darsi",
    "TVs refrigerators washing machines Darsi",
    "Prakasam District electronics"
  ],
  openGraph: {
    title: "RajaMart Electronics & Furniture",
    description:
      "Your trusted electronics and furniture store in Darsi with EMI, offers, delivery and WhatsApp ordering.",
    type: "website",
    locale: "en_IN",
    siteName: "RajaMart Electronics & Furniture"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#071d45"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
