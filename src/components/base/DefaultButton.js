import Link from "next/link";
import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

function DefaultButton({ text }) {
  const { isDarkMode } = useContext(ThemeContext);
  
  return (
    <Link href="/project" className={`default-btn ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      {text}
    </Link>
  );
}

export default DefaultButton;
