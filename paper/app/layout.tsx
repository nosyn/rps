import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./markdown.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paper",
  description: "Research with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
