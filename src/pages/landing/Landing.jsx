import React from "react";
import styles from "./Landing.module.css";
import { useTranslation } from "react-i18next";


export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className={styles.landingContainer}>

      <header className={styles.landingHeader}>
        <h1 className={styles.title}>{t("appName")}</h1>
        <h3 className={styles.subtitle}>{t("slogan")}</h3>
      </header>

      <main className={styles.landingContent}>
        <section className={styles.featureSection}>
          <h2>{t("heroTitle")}</h2>
          <p>{t("heroSubtitle")}</p>
        </section>
        <section className={styles.callToAction}>
            <p>{t("ctaTitle")}</p>
          <button className={styles.ctaButton}>{t("ctaButton")}</button>
        </section>
      </main>

    </div>
  );
}
