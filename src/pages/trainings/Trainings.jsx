import React, { useState, useMemo } from 'react';
import styles from './Trainings.module.css';
import { useTranslation } from 'react-i18next';

export default function Trainings() {
  const { t } = useTranslation();
  const [selectedTraining, setSelectedTraining] = useState();

  const weekDays = t('weekDays', { returnObjects: true });
  const trainingTypes = t('trainingTypes', { returnObjects: true });
  const workouts = []; 

  const trainingsByDate = useMemo(() => {
    const map = {};
    for (const w of workouts) {
      const d = new Date(w.date);
      if (Number.isNaN(d.getTime())) continue;
      const mondayIndex = (d.getDay() + 6) % 7; 
      const dayKey = weekDays[mondayIndex];  
      map[`${dayKey}-${w.type}`] = w;
    }
    return map;
  }, [workouts, weekDays]);

  return (
        <div className={styles.trainingsContainer}>
            <div className={styles.table}>
              <table className={styles.weekTable}>
                <thead>
                  <tr>
                    <th>{t('type')}</th>
                      {weekDays.map((day) => (
                        <th key={day}>{day}</th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                {trainingTypes.map((type) => (
                  <tr key={type}>
                    <td className={styles.trainingType}>{type}</td>
                      {weekDays.map((day) => {
                        const training = trainingsByDate[`${day}-${type}`];
                        return (
                          <td
                            key={day}
                            className={styles.cell}
                            onClick={() => training && setSelectedTraining(training)}
                          >
                            {training ? (
                              <>
                                <span>{training.training_type}</span>
                                <small>{training.date}</small>
                              </>
                            ) : (
                              <span className={styles.empty}>-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.form}>
              <h3 className={styles.formTitle}>{t('newTraining')}</h3>
              <form className={styles.formBody}>
                <div className={styles.formGroup}>
                  <label htmlFor="date" className={styles.formLabel}>{t('date')}</label>
                  <input id="date" type="date" name="date" className={styles.formInput} />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="type" className={styles.formLabel}>{t('type')}</label>
                  <select id="type" name="type" className={styles.formSelect}>
                    {trainingTypes.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="distance" className={styles.formLabel}>{t('distance')}</label>
                  <input id="distance" type="number" step="0.01" name="distance_km" className={styles.formInput} />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="duration" className={styles.formLabel}>{t('duration')}</label>
                  <input id="duration" type="number" name="duration_minutes" className={styles.formInput} />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="notes" className={styles.formLabel}>{t('notes')}</label>
                  <textarea id="notes" name="notes" className={styles.formInput}></textarea>
                </div>

                <button type="submit" className={styles.formButton}>{t('add')}</button>
              </form>
            </div>
            
            {selectedTraining && (
              <div className={styles.modalOverlay} onClick={() => setSelectedTraining(null)}>
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                  <h3>
                    {selectedTraining.type} - {selectedTraining.date}
                  </h3>
                  <ul>
                    <li>{t('distance')}: {selectedTraining.distance_km} km</li>
                    <li>{t('duration')}: {selectedTraining.duration_minutes} min</li>
                    <li>{t('notes')}: {selectedTraining.notes || '-'}</li>
                  </ul>
                  <button onClick={() => setSelectedTraining(null)}>{t('close')}</button>
                </div>
              </div>
            )}
        </div>
    );
}
