import { Inter } from "next/font/google";
import "@/modules/styles/global.scss";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=0.8,minimum-scale=0.8"
        ></meta>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
