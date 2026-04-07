"use client";
import { ThemeProvider } from "next-themes";
export default function ThemeProviderWrapper({ children ,...props}) {
  return <ThemeProvider attribute="data-theme">{children}</ThemeProvider>;
}