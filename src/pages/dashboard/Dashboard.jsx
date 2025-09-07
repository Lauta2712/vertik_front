import React from 'react';
import styles from './Dashboard.module.css';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import Sidebar from '../../components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
    return (
        <div className={styles.dashboardContainer}>
            <Navbar />

            <div className={styles.dashboardContent}>
                <Sidebar />

                <main className={styles.mainContent}>
                    <Outlet />
                </main>
            </div>

            <Footer />
        </div>
    );
}
