import type { Metadata } from "next";
import { Inter, Montserrat, Poppins, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./footer/page";
import { AuthProvider } from "../context/AuthContext";
import { ToastProvider } from "./providers/ToastProvider"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://checkmysite.vercel.app"),
  title: "CheckMySite - Website Conversion Analysis",
  description: "Identify design flaws and conversion blockers with our deterministic audit tool.",
  openGraph: {
    title: "CheckMySite - Website Conversion Analysis",
    description: "Identify design flaws and conversion blockers with our deterministic audit tool.",
    type: "website",
    url: "https://checkmysite.vercel.app",
    siteName: "CheckMySite",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CheckMySite Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CheckMySite - Website Conversion Analysis",
    description: "Identify design flaws and conversion blockers with our deterministic audit tool.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={`${inter.variable} ${montserrat.variable} ${poppins.variable} ${outfit.variable} antialiased`}
      >
        <ToastProvider>
          <AuthProvider>
            <Navbar />
            <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
              {children}
            </main>
            {modal}
            <Footer />
          </AuthProvider>
        </ToastProvider>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </body>
    </html >
  );
}
