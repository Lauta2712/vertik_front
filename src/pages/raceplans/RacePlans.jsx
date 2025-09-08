import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./RacePlans.module.css";
import PlanSummary from "./PlanSummary";

export default function RacePlans() {
  const { t } = useTranslation();
  const [discipline, setDiscipline] = useState("trail");
  const [plan, setPlan] = useState({
    water: "",
    gels: "",
    salts: "",
    food: "",
  });

  const handleChange = (e) => {
    setPlan({
      ...plan,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("racePlansTitle")}</h2>

      <div className={styles.field}>
        <label>{t("discipline")}:</label>
        <select
          value={discipline}
          onChange={(e) => setDiscipline(e.target.value)}
        >
          {t("disciplines", { returnObjects: true }).map((d, i) => (
            <option key={i} value={d.toLowerCase()}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label>{t("water")}:</label>
        <input
          type="number"
          name="water"
          value={plan.water}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label>{t("gels")}:</label>
        <input
          type="number"
          name="gels"
          value={plan.gels}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label>{t("salts")}:</label>
        <input
          type="number"
          name="salts"
          value={plan.salts}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label>{t("food")}:</label>
        <input
          type="text"
          name="food"
          value={plan.food}
          onChange={handleChange}
          placeholder="Ej: barra energética..."
        />
      </div>

      <PlanSummary discipline={discipline} plan={plan} />
    </div>
  );
}
