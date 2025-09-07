import React from 'react';
import styles from './Footer.module.css';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className={styles.footer}>
            <p>© {new Date().getFullYear()} Vertik.</p>
            <span className={styles.creator}>
                {t('createdBy')}{' '}
                <a
                    href="https://www.lautaro.website/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.name}
                >
                    Lautaro Rodriguez
                </a>
            </span>
        </footer>
    );
}
