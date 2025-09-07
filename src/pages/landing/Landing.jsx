import React from 'react';
import styles from './Landing.module.css';
import { useTranslation } from 'react-i18next';
import Background from '../../components/background/Background';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

export default function LandingPage() {
    const { t } = useTranslation();
    const { loginWithRedirect } = useAuth0();

    return (
        <div className={styles.landingContainer}>
            <Navbar />
            <Background />

            <main className={styles.landingContent}>
                <section className={styles.featureSection}>
                    <h2>{t('heroTitle')}</h2>
                    <p>{t('heroSubtitle')}</p>
                </section>

                <section className={styles.featuresGrid}>
                    <div className={styles.featureCard}>
                        <h3>🍽 {t('featureMealsTitle')}</h3>
                        <p>{t('featureMealsDesc')}</p>
                    </div>
                    <div className={styles.featureCard}>
                        <h3>🏋️ {t('featureTrainingTitle')}</h3>
                        <p>{t('featureTrainingDesc')}</p>
                    </div>
                    <div className={styles.featureCard}>
                        <h3>📊 {t('featureProgressTitle')}</h3>
                        <p>{t('featureProgressDesc')}</p>
                    </div>
                </section>

                <section className={styles.callToAction}>
                    <p>{t('ctaTitle')}</p>
                    <button className={styles.ctaButton} onClick={() => loginWithRedirect()}>
                        Comenzar
                    </button>
                </section>
            </main>
            <Footer />
        </div>
    );
}
