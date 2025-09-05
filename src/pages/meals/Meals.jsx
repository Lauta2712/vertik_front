import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDailyMeals } from '../../redux/actions';
import { useTranslation } from 'react-i18next';
import styles from '../meals/Meals.module.css';

export default function Meals() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const dailyMeals = useSelector(state => state.dailyMeals);

  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    dispatch(getDailyMeals());
  }, [dispatch]);

  const mealsByDate = [];

  const weekDays = t("weekDays", { returnObjects: true });
  const mealTypes = t("mealTypes", { returnObjects: true });

  return (
    <div className={styles.mealsContainer}>
      <div className={styles.table}>
        <table className={styles.weekTable}>
          <thead>
            <tr>
              <th>{t("type")}</th>
              {weekDays.map(day => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mealTypes.map(type => (
              <tr key={type}>
                <td className={styles.mealType}>{type}</td>
                {weekDays.map(day => {
                  const meal = mealsByDate[`${day}-${type}`]; 
                  return (
                    <td
                      key={day}
                      className={styles.cell}
                      onClick={() => meal && setSelectedMeal(meal)}
                    >
                      {meal ? (
                        <>
                          <span>{meal.meal_type}</span>
                          <small>{meal.date}</small>
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
        <h3 className={styles.formTitle}>{t("newMeal")}</h3>
        <form className={styles.formBody}>
          <div className={styles.formGroup}>
            <label htmlFor="date" className={styles.formLabel}>{t("date")}</label>
            <input id="date" type="date" name="date" className={styles.formInput} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="meal_type" className={styles.formLabel}>{t("type")}</label>
            <select id="meal_type" name="meal_type" className={styles.formSelect}>
              {mealTypes.map(type => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          <button type="submit" className={styles.formButton}>{t("add")}</button>
        </form>
      </div>

      {selectedMeal && (
        <div className={styles.modalOverlay} onClick={() => setSelectedMeal(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h3>{selectedMeal.meal_type} - {selectedMeal.date}</h3>
            <ul>
              {selectedMeal.items?.map(item => (
                <li key={item.id}>
                  {item.food_name} - {item.calories} cal
                </li>
              ))}
            </ul>
            <button onClick={() => setSelectedMeal(null)}>{t("close")}</button>
          </div>
        </div>
      )}
    </div>
  );
}
