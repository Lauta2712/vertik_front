import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, Utensils, Dumbbell, Flag, ClipboardList, BarChart2, User, Pill } from "lucide-react";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { label: t("meals"), icon: <Utensils size={20} /> },
    { label: t("trainings"), icon: <Dumbbell size={20} /> },
    { label: t("races"), icon: <Flag size={20} /> },
    { label: t("racePlans"), icon: <ClipboardList size={20} /> },
    { label: t("statistics"), icon: <BarChart2 size={20} /> },
    { label: t("supplements"), icon: <Pill size={20} /> },
    { label: t("profile"), icon: <User size={20} /> },
  ];

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <button className={styles.toggleBtn} onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <ul className={styles.menu}>
        {menuItems.map((item, idx) => (
          <li key={idx} className={styles.menuItem}>
            {item.icon}
            {isOpen && <span>{item.label}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
