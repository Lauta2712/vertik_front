import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const [theme, setTheme] = useState("light");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""} ${isDashboard ? styles.dashboard : ""}`}>      
      <h1 className={styles.title}>Vertik</h1>

      <div className={styles.switches}>
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
      </div>
    </nav>
  );
}
