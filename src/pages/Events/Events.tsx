import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import styles from '../../styles/Events.module.scss';
import EventCard from '../../components/EventCard';

type EventType = 'outdoor' | 'indoor' | 'education';
type EventStatus = 'upcoming' | 'completed' | 'cancelled';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: EventType;
  status: EventStatus;
  description: string;
  tags: string[];
}

const Events: React.FC = () => {
  const [filter, setFilter] = useState<EventStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const events: Event[] = [
    {
      id: 1,
      title: 'Мастер-класс по гончарному делу',
      date: '15 мая 2024',
      time: '15:00 - 17:00',
      location: 'Творческая студия "Глина"',
      type: 'indoor',
      status: 'upcoming',
      description: 'Увлекательный мастер-класс для всей семьи, где каждый сможет создать свое уникальное керамическое изделие под руководством опытного мастера.',
      tags: ['творчество', 'керамика', 'для всей семьи']
    },
    {
      id: 2,
      title: 'Поход в веревочный парк',
      date: '10 мая 2024',
      time: '11:00 - 14:00',
      location: 'Парк приключений "Высота"',
      type: 'outdoor',
      status: 'completed',
      description: 'Активный отдых на свежем воздухе с прохождением различных препятствий на высоте. Несколько уровней сложности для детей и взрослых.',
      tags: ['активный отдых', 'спорт', 'природа']
    },
    {
      id: 3,
      title: 'Научное шоу для детей',
      date: '20 мая 2024',
      time: '12:00 - 13:30',
      location: 'Детский центр "Эврика"',
      type: 'education',
      status: 'upcoming',
      description: 'Увлекательные научные эксперименты, которые помогут детям понять основы физики и химии в игровой форме.',
      tags: ['наука', 'образование', 'для детей']
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'all' || event.status === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleEventAction = (eventId: number, action: string) => {
    console.log(`Event ${eventId} action: ${action}`);
  };

  return (
    <div className={styles.eventsPage}>
      <div className={styles.backgroundEffects}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1>Мероприятия</h1>
            <p>Управляйте своими семейными событиями</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={styles.createButton}
          >
            Создать мероприятие
          </motion.button>
        </div>

        <div className={styles.filters}>
          <div className={styles.filtersContent}>
            <div className={styles.filterButtons}>
              <button
                className={classNames(styles.filterButton, {
                  [styles.active]: filter === 'all'
                })}
                onClick={() => setFilter('all')}
              >
                Все
              </button>
              <button
                className={classNames(styles.filterButton, {
                  [styles.active]: filter === 'upcoming'
                })}
                onClick={() => setFilter('upcoming')}
              >
                Предстоящие
              </button>
              <button
                className={classNames(styles.filterButton, {
                  [styles.active]: filter === 'completed'
                })}
                onClick={() => setFilter('completed')}
              >
                Завершенные
              </button>
            </div>

            <div className={styles.filterControls}>
              <div className={styles.searchInput}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск мероприятий..."
                />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <div className={styles.viewToggle}>
                <button
                  onClick={() => setView('grid')}
                  className={classNames({ [styles.active]: view === 'grid' })}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setView('list')}
                  className={classNames({ [styles.active]: view === 'list' })}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={classNames(styles.eventGrid, {
          [styles.gridView]: view === 'grid',
          [styles.listView]: view === 'list'
        })}>
          <AnimatePresence>
            {filteredEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onAction={handleEventAction}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredEvents.length === 0 && (
          <div className={styles.emptyState}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3>Мероприятия не найдены</h3>
            <p>Попробуйте изменить параметры поиска или создайте новое мероприятие</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events; 