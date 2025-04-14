import Link from "next/link";
import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

function DefaultButton({ text, link = "/project", className = "" }) {
  const { isDarkMode } = useContext(ThemeContext);
  
  return (
    <Link href={link} className={`default-btn ${isDarkMode ? 'dark-theme' : 'light-theme'} ${className}`}>
      {text}
    </Link>
  );
}

export default DefaultButton;
