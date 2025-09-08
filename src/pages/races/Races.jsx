import React, { useState } from 'react';
import styles from './Races.module.css';
import { useTranslation } from 'react-i18next';

export default function Races() {
  const { t } = useTranslation();
  const [selectedRace, setSelectedRace] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

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

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const startDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const cells = [];
  for (let i = 0; i < startDay; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(currentYear, currentMonth, d));
  }

  const racesByDate = {};
  races.forEach(r => {
    racesByDate[r.date] = r;
  });

  const monthNames = [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  return (
    <div className={styles.racesContainer}>
      <div className={styles.calendarHeaderRow}>
        {/* <button onClick={handlePrevMonth} className={styles.navButton}>◀</button>
        <h2 className={styles.monthLabel}>
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button onClick={handleNextMonth} className={styles.navButton}>▶</button> */}
          <button onClick={handlePrevMonth} className={styles.navButton}>◀</button>
          <h2 className={styles.monthLabel}>
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button onClick={handleNextMonth} className={styles.navButton}>▶</button>

          <button className={styles.addButton} onClick={() => setShowForm(true)}>
            + {t('addRace')}
          </button>
      </div>

      <div className={styles.calendar}>
        {['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'].map(day => (
          <div key={day} className={styles.calendarHeader}>{day}</div>
        ))}
        {cells.map((date, i) => {
          const isoDate = date ? date.toISOString().split('T')[0] : null;
          const race = isoDate ? racesByDate[isoDate] : null;

          const isToday =
            date &&
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

          return (
            <div
              key={i}
              className={`${styles.calendarCell} ${race ? styles.hasRace : ''} ${isToday ? styles.today : ''}`}
              onClick={() => race && setSelectedRace(race)}
            >
              {date && <span className={styles.dayNumber}>{date.getDate()}</span>}
              {race && <span className={styles.raceName}>{race.name}</span>}
            </div>
          );
        })}
      </div>

      {selectedRace && (
        <div className={styles.modalOverlay} onClick={() => setSelectedRace(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h3>{selectedRace.name}</h3>
            <ul className={styles.detailsList}>
              <li>
                <span className={styles.detailsLabel}>{t('date')}</span>
                <span className={styles.detailsValue}>{selectedRace.date}</span>
              </li>
              <li>
                <span className={styles.detailsLabel}>{t('distance')}</span>
                <span className={`${styles.detailsValue} ${styles.badge}`}>
                  {selectedRace.distance_km} km
                </span>
              </li>
              <li>
                <span className={styles.detailsLabel}>{t('duration')}</span>
                <span className={styles.detailsValue}>
                  {selectedRace.duration_minutes} min
                </span>
              </li>
              <li>
                <span className={styles.detailsLabel}>{t('position')}</span>
                <span className={styles.detailsValue}>#{selectedRace.position}</span>
              </li>
              <li style={{ gridColumn: "1 / -1" }}>
                <span className={styles.detailsLabel}>{t('notes')}</span>
                <span className={styles.detailsValue}>
                  {selectedRace.notes || '-'}
                </span>
              </li>
            </ul>
            <button onClick={() => setSelectedRace(null)}>{t('close')}</button>
          </div>
        </div>
      )}

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
