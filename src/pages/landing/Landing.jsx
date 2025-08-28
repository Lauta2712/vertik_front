import React from "react";
import styles from "./Landing.module.css";
import { useTranslation } from "react-i18next";
import Background from "../../components/background/Background";

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className={styles.landingContainer}>
      <Background />

      <header className={styles.landingHeader}>
        <h1 className={styles.title}>{t("appName")}</h1>
        <h3 className={styles.subtitle}>{t("slogan")}</h3>
      </header>

      <main className={styles.landingContent}>
        
        <section className={styles.featureSection}>
          <h2>{t("heroTitle")}</h2>
          <p>{t("heroSubtitle")}</p>
        </section>

          <section className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <h3>🍽 {t("featureMealsTitle")}</h3>
              <p>{t("featureMealsDesc")}</p>
            </div>
            <div className={styles.featureCard}>
              <h3>🏋️ {t("featureTrainingTitle")}</h3>
              <p>{t("featureTrainingDesc")}</p>
            </div>
            <div className={styles.featureCard}>
              <h3>📊 {t("featureProgressTitle")}</h3>
              <p>{t("featureProgressDesc")}</p>
            </div>
          </section>

        <section className={styles.callToAction}>
            <p>{t("ctaTitle")}</p>
          <button className={styles.ctaButton}>{t("ctaButton")}</button>
        </section>
      </main>

    </div>
  );
}
