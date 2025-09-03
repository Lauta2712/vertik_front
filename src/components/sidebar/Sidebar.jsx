import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, Utensils, Dumbbell, Flag, ClipboardList, BarChart2, User, Pill } from "lucide-react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { label: t("meals"), icon: <Utensils size={20} />, path: "meals" },
    { label: t("trainings"), icon: <Dumbbell size={20} />, path: "trainings" },
    { label: t("races"), icon: <Flag size={20} />, path: "races" },
    { label: t("racePlans"), icon: <ClipboardList size={20} />, path: "race-plans" },
    { label: t("statistics"), icon: <BarChart2 size={20} />, path: "statistics" },
    { label: t("supplements"), icon: <Pill size={20} />, path: "supplements" },
    { label: t("profile"), icon: <User size={20} />, path: "profile" },
  ];

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <button className={styles.toggleBtn} onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <ul className={styles.menu}>
        {menuItems.map((item, idx) => (
          <li key={idx}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `${styles.menuItem} ${isActive ? styles.active : ""}`
              }
            >
              {item.icon}
              {isOpen && <span>{item.label}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
