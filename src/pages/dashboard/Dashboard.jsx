import React from "react";
import { useSelector } from "react-redux";
import styles from "./Dashboard.module.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Dashboard(){
    // const users = useSelector(state => state.rootReducer.users);
    // console.log('USERS: ', users);

    return(
        <div className={styles.dashboardContainer}>
            <Navbar />

            <div className={styles.dashboardContent}>
                <Sidebar />
            </div>

            <Footer />
        </div>
    );
};