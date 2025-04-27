import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";
import Provider from "@/components/ui/Provider";
import "./globals.css";
import TopBar from "./components/TopBar";
import { Toaster } from "@/components/ui/toaster";
import { DayPickerProvider } from "react-day-picker";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IoT Lab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TopBar />
            {children}
            <Toaster />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
