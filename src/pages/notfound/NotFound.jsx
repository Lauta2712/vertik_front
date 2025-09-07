import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{t('notFoundTitle')}</h1>
            <p className={styles.message}>{t('notFoundDescription')}</p>
            <Link to="/" className={styles.homeButton}>
                {t('notFoundBack')}
            </Link>
        </div>
    );
}
