import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import styles from '../../styles/Calendar.module.scss';
import EventCard from '../../components/CalendarEventCard';

type EventType = 'family' | 'kids' | 'outdoor' | 'indoor';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: EventType;
}

const Calendar: React.FC = () => {
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  const events: Event[] = [
    {
      id: 1,
      title: 'Мастер-класс по гончарному делу',
      date: '15 мая 2024',
      time: '12:00 - 14:00',
      location: 'Творческая студия "Глина"',
      type: 'family'
    },
    {
      id: 2,
      title: 'Поход в парк развлечений',
      date: '16 мая 2024',
      time: '11:00 - 18:00',
      location: 'Парк "Сказка"',
      type: 'kids'
    },
    {
      id: 3,
      title: 'Велопрогулка',
      date: '17 мая 2024',
      time: '10:00 - 13:00',
      location: 'Городской парк',
      type: 'outdoor'
    },
    {
      id: 4,
      title: 'Семейный киновечер',
      date: '18 мая 2024',
      time: '19:00 - 21:00',
      location: 'Дома',
      type: 'indoor'
    }
  ];

  return (
    <div className={styles.calendarPage}>
      <div className={styles.backgroundEffects}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
      </div>

      <div className={styles.container}>
        <div className={styles.calendarGrid}>
          <div className={styles.mainContent}>
            <div className={styles.header}>
              <div className={styles.navigation}>
                <button className={styles.navButton}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className={styles.currentMonth}>Май 2024</span>
                <button className={styles.navButton}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className={styles.viewToggle}>
                <button 
                  onClick={() => setView('month')}
                  className={classNames(styles.viewButton, {
                    [styles.active]: view === 'month'
                  })}
                >
                  Месяц
                </button>
                <button 
                  onClick={() => setView('week')}
                  className={classNames(styles.viewButton, {
                    [styles.active]: view === 'week'
                  })}
                >
                  Неделя
                </button>
                <button 
                  onClick={() => setView('day')}
                  className={classNames(styles.viewButton, {
                    [styles.active]: view === 'day'
                  })}
                >
                  День
                </button>
              </div>
            </div>

            <div className={styles.calendar}>
              <div className={styles.weekDays}>
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                  <div key={day} className={styles.weekDay}>
                    {day}
                  </div>
                ))}
              </div>
              <div className={styles.days}>
                {Array.from({ length: 35 }).map((_, i) => {
                  const dayNumber = ((i + 1) % 31) || 31;
                  const hasEvent = [15, 16, 17, 18].includes(dayNumber);
                  const isSelected = i === 14;
                  return (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 0.98 }}
                      className={classNames(styles.day, {
                        [styles.selected]: isSelected,
                        [styles.hasEvent]: hasEvent
                      })}
                    >
                      <span className={styles.dayNumber}>{dayNumber}</span>
                      {hasEvent && <div className={styles.eventIndicator} />}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <h2>Предстоящие события</h2>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={styles.addButton}
              >
                Добавить
              </motion.button>
            </div>
            <div className={styles.eventsList}>
              <AnimatePresence>
                {events.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar; 