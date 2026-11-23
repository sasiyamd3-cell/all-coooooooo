import "./globals.css";

export const metadata = {
  title: "MIYORA — Your Digital World",
  description: "A refined digital ecosystem for AI tools, developer utilities, ideas, and makers.",
  applicationName: "MIYORA",
  keywords: ["MIYORA", "AI tools", "developer tools", "digital workspace"]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
