import React, { useState } from 'react';
import styles from './Races.module.css';
import { useTranslation } from 'react-i18next';

export default function Races() {
  const { t } = useTranslation();
  const [selectedRace, setSelectedRace] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // TODO: reemplazar con races desde Redux/DB
  const races = [
    {
      id: 1,
      name: 'Maratón San Juan',
      date: '2025-09-12',
      distance_km: 42.195,
      duration_minutes: 210,
      position: 15,
      notes: 'Muy dura pero hermosa!',
    },
    {
      id: 2,
      name: 'Trail Ullum',
      date: '2025-09-20',
      distance_km: 21,
      duration_minutes: 145,
      position: 7,
      notes: 'Mucho desnivel positivo',
    },
  ];

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0=Enero
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay(); // 0=Domingo
  const daysInMonth = lastDay.getDate();

  const cells = [];
  for (let i = 0; i < startDay; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }

  const racesByDate = {};
  races.forEach(r => {
    racesByDate[r.date] = r;
  });

  return (
    <div className={styles.racesContainer}>
      {/* <h2>{t('races')}</h2> */}
      <div className={styles.calendar}>
        {['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'].map(day => (
          <div key={day} className={styles.calendarHeader}>{day}</div>
        ))}
        {cells.map((date, i) => {
          const isoDate = date ? date.toISOString().split('T')[0] : null;
          const race = isoDate ? racesByDate[isoDate] : null;
          return (
            <div
              key={i}
              className={`${styles.calendarCell} ${race ? styles.hasRace : ''}`}
              onClick={() => race && setSelectedRace(race)}
            >
              {date && <span className={styles.dayNumber}>{date.getDate()}</span>}
              {race && <span className={styles.raceName}>{race.name}</span>}
            </div>
          );
        })}
      </div>

      <button className={styles.addButton} onClick={() => setShowForm(true)}>
        + {t('addRace')}
      </button>

      {/* Modal detalle */}
      {selectedRace && (
        <div className={styles.modalOverlay} onClick={() => setSelectedRace(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h3>{selectedRace.name}</h3>
            <ul>
              <li>{t('date')}: {selectedRace.date}</li>
              <li>{t('distance')}: {selectedRace.distance_km} km</li>
              <li>{t('duration')}: {selectedRace.duration_minutes} min</li>
              <li>{t('position')}: {selectedRace.position}</li>
              <li>{t('notes')}: {selectedRace.notes || '-'}</li>
            </ul>
            <button onClick={() => setSelectedRace(null)}>{t('close')}</button>
          </div>
        </div>
      )}

      {/* Modal formulario */}
      {showForm && (
        <div className={styles.modalOverlay} onClick={() => setShowForm(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h3>{t('newRace')}</h3>
            <form className={styles.form}>
              <label>{t('name')}</label>
              <input type="text" name="name" required />

              <label>{t('date')}</label>
              <input type="date" name="date" required />

              <label>{t('distance')}</label>
              <input type="number" step="0.01" name="distance_km" />

              <label>{t('duration')}</label>
              <input type="number" name="duration_minutes" />

              <label>{t('position')}</label>
              <input type="number" name="position" />

              <label>{t('notes')}</label>
              <textarea name="notes"></textarea>

              <button type="submit">{t('add')}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
