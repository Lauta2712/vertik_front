import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Profile.module.css";

export default function Profile() {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated || !user) {
    return <p className={styles.loading}>{t("profile.noUser")}</p>;
  }

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <img src={user.picture} alt={user.name} className={styles.avatar} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>

      <div className={styles.details}>
        <p><strong>{t("nickname")}:</strong> {user.nickname || "N/A"}</p>
        <p><strong>{t("fullName")}:</strong> {user.given_name} {user.family_name}</p>
        <p><strong>{t("emailVerified")}:</strong> {user.email_verified ? t("yes") : t("no")}</p>
        <p><strong>{t("updatedAt")}:</strong> {new Date(user.updated_at).toLocaleString()}</p>
      </div>
    </div>
  );
}