import "./globals.css";
import { SessionProvider } from "next-auth/react"

export const metadata = {
  title: "우리 커스터마이징",
  description: "우리 커스터마이징 서비스",
  icons: {
    icon: "/wooriimages/woori_ci.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en" className="flex justify-center h-full overflow-hidden">
        <body
          className={`flex flex-col w-full h-full bg-slate-400`}
          >
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
