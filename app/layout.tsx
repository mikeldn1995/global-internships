import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Global Internships - Your Gateway to International Opportunities",
  description: "Join thousands of students discovering life-changing internship opportunities around the world. Start your journey today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-B0DDQTWEM4"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-B0DDQTWEM4');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

