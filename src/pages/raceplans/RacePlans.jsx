import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./RacePlans.module.css";
import PlanSummary from "./PlanSummary";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

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

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(t("racePlansTitle"), 10, 20);
    doc.setFontSize(12);
    doc.text(`${t("discipline")}: ${discipline}`, 10, 40);
    doc.text(`${t("water")}: ${plan.water}`, 10, 50);
    doc.text(`${t("gels")}: ${plan.gels}`, 10, 60);
    doc.text(`${t("salts")}: ${plan.salts}`, 10, 70);
    doc.text(`${t("food")}: ${plan.food}`, 10, 80);
    doc.save("plan.pdf");
  };

  const downloadDOCX = async () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun({ text: t("racePlansTitle"), bold: true, size: 32 })],
            }),
            new Paragraph(`${t("discipline")}: ${discipline}`),
            new Paragraph(`${t("water")}: ${plan.water}`),
            new Paragraph(`${t("gels")}: ${plan.gels}`),
            new Paragraph(`${t("salts")}: ${plan.salts}`),
            new Paragraph(`${t("food")}: ${plan.food}`),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "plan.docx");
  };

  return (
    <div className={styles.container}>
      <div>
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

        <div className={styles.buttons}>
          <button onClick={downloadPDF}>{t("downloadPDF")}</button>
          <button onClick={downloadDOCX}>{t("downloadDOCX")}</button>
        </div>
      </div>

      <div>
        <PlanSummary discipline={discipline} plan={plan} />
      </div>
    </div>
  );
}
