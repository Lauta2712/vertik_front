import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Profile.module.css";

export default function Profile() {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth0();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  if (!isAuthenticated || !user) {
    return <p className={styles.loading}>{t("profile.noUser")}</p>;
  }

  const handleEdit = () => {
    setFormData({
      name: user.name || "",
      nickname: user.nickname || "",
      given_name: user.given_name || "",
      family_name: user.family_name || "",
      email: user.email || "",
    });
    setIsEditing(true);
  };

  const handleCancel = () => setIsEditing(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Datos a guardar:", formData);
    setIsEditing(false);
  };

  return (
    <section className={styles.profile}>
      <header className={styles.header}>
        <div className={styles.avatarWrapper}>
          <img src={user.picture} alt={user.name} className={styles.avatar} />
        </div>
        <h2 className={styles.name}>{user.name}</h2>
        <p className={styles.email}>{user.email}</p>
        {!isEditing && (
          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={handleEdit}
          >
            ✎ {t("edit")}
          </button>
        )}
      </header>

      {!isEditing ? (
        <div className={styles.details}>
          <div className={styles.detailsRow}>
            <span>{t("nickname")}:</span>
            <span>{user.nickname || "N/A"}</span>
          </div>
          <div className={styles.detailsRow}>
            <span>{t("fullName")}:</span>
            <span>
              {user.given_name} {user.family_name}
            </span>
          </div>
          <div className={styles.detailsRow}>
            <span>{t("emailVerified")}:</span>
            <span>{user.email_verified ? t("yes") : t("no")}</span>
          </div>
          <div className={styles.detailsRow}>
            <span>{t("updatedAt")}: </span>
            <span>{new Date(user.updated_at).toLocaleString()}</span>
          </div>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSave}>
          <div className={styles.formGroup}>
            <label>{t("fullName")}</label>
            <div className={styles.inlineInputs}>
              <input
                type="text"
                name="given_name"
                value={formData.given_name}
                onChange={handleChange}
                className={styles.input}
                placeholder={t("firstName")}
              />
              <input
                type="text"
                name="family_name"
                value={formData.family_name}
                onChange={handleChange}
                className={styles.input}
                placeholder={t("lastName")}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>{t("nickname")}</label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>{t("email")}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.actions}>
            <button
              type="submit"
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              {t("save")}
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={handleCancel}
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
