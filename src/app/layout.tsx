import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootContext from "@/contexts";
import Navbar from "@/design/organisms/Navbar";
import authService from "@/api/AuthService";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat Application",
  description: "Connect with your geeky friends",
};

export const fetchUserBySession = async () => {
  try {
    const token = cookies().get("token")?.value;
    const res = await authService.me(token || "");
    return res.json();
  } catch (error) {
    return null;
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchUserBySession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootContext session={user?.result}>
          <div className="space-y-5 pb-2">
            <Navbar />
            {children}
          </div>
        </RootContext>
      </body>
    </html>
  );
}
