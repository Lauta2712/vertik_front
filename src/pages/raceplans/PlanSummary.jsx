import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./RacePlans.module.css";

export default function PlanSummary({ discipline, plan }) {
  const { t } = useTranslation();

  return (
    <div className={styles.summary}>
      <h3>{t("summary")}</h3>
      <p>
        <strong>{t("discipline")}:</strong> {discipline}
      </p>
      <p>
        <strong>{t("water")}:</strong> {plan.water} ml
      </p>
      <p>
        <strong>{t("gels")}:</strong> {plan.gels}
      </p>
      <p>
        <strong>{t("salts")}:</strong> {plan.salts}
      </p>
      <p>
        <strong>{t("food")}:</strong> {plan.food}
      </p>
    </div>
  );
}
