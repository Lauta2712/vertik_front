import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { i18n } = useTranslation();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.switch} onClick={toggleTheme}>
        <div
          className={`${styles.slider} ${
            theme === "dark" ? styles.active : ""
          }`}
        >
          {theme === "light" ? "☀️" : "🌙"}
        </div>
      </div>

      <div className={styles.switch} onClick={toggleLanguage}>
        <div
          className={`${styles.slider} ${
            i18n.language === "en" ? styles.active : ""
          }`}
        >
          {i18n.language === "es" ? "ES" : "EN"}
        </div>
      </div>
    </nav>
  );
}
