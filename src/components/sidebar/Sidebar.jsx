import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, Utensils, Dumbbell, Flag, ClipboardList, BarChart2, User, Pill, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);
  const { logout } = useAuth0();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { label: t("meals"), icon: <Utensils size={20} />, path: "/dashboard/meals" },
    { label: t("trainings"), icon: <Dumbbell size={20} />, path: "/dashboard/trainings" },
    { label: t("races"), icon: <Flag size={20} />, path: "/dashboard/races" },
    { label: t("racePlans"), icon: <ClipboardList size={20} />, path: "/dashboard/racePlans" },
    { label: t("statistics"), icon: <BarChart2 size={20} />, path: "/dashboard/statistics" },
    { label: t("supplements"), icon: <Pill size={20} />, path: "/dashboard/supplements" },
    { label: t("profile"), icon: <User size={20} />, path: "/dashboard/profile" },
  ];

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      {/* <button className={styles.toggleBtn} onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button> */}

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

        <li>
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            className={styles.menuItem}
          >
            <LogOut size={20} />
            {isOpen && <span>{t("logout")}</span>}
          </button>
        </li>
      </ul>
    </div>
  );
}
