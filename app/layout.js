import "./globals.css";

export const metadata = {
  title: "Personal 3D Home",
  description: "A Next.js home experience powered by IWSDK with notes."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
