import "./globals.css";

export const metadata = {
  title: "MIYORA | All-in-One Platform",
  description:
    "MIYORA - Your premium all-in-one digital platform.",
  keywords: [
    "MIYORA",
    "AI Tools",
    "Developer Tools",
    "Digital Platform",
  ],
  authors: [{ name: "MIYORA Team" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
