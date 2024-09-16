import "./globals.css";
import Wrapper from "@/wrapper/wrapper";

export const metadata = {
  title: "x",
  description: "x created by ritik shah!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
