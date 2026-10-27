import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ReeltraceProvider } from "@/lib/context/reeltrace-context";

export const metadata: Metadata = {
  title: "REELTRACE — The Cinema Memory Machine",
  description:
    "You remember the moment. We find the movie. A line, a scene, a feeling — start with whatever stayed with you.",
};

export const viewport: Viewport = {
  themeColor: "#eeece4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReeltraceProvider>
          <div className="grain" />
          {children}
        </ReeltraceProvider>
      </body>
    </html>
  );
}
