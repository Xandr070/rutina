import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import styles from '../styles/EventCard.module.scss';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'outdoor' | 'indoor' | 'education';
  status: 'upcoming' | 'completed' | 'cancelled';
  description: string;
  tags: string[];
}

interface EventCardProps {
  event: Event;
  onAction: (eventId: number, action: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onAction }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getTypeIcon = () => {
    switch (event.type) {
      case 'outdoor':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'indoor':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'education':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
    }
  };

  return (
    <div
      className={classNames(styles.eventCard, {
        [styles.expanded]: isExpanded
      })}
    >
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <div className={styles.headerLeft}>
            <div className={classNames(styles.typeIcon, styles[event.status])}>
              {getTypeIcon()}
            </div>
            <div className={styles.titleBlock}>
              <h3>{event.title}</h3>
              <p>{event.date}</p>
            </div>
          </div>
          <span className={classNames(styles.status, styles[event.status])}>
            {event.status === 'upcoming' ? 'Предстоит' : 
             event.status === 'completed' ? 'Завершено' : 'Отменено'}
          </span>
        </div>

        <div className={styles.eventInfo}>
          <div className={styles.infoItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {event.time}
          </div>
          <div className={styles.infoItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={styles.expandedContent}
            >
              <p className={styles.description}>{event.description}</p>
              <div className={styles.tags}>
                {event.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              {event.status === 'upcoming' && (
                <div className={styles.actions}>
                  <button
                    onClick={() => onAction(event.id, 'cancel')}
                    className={styles.cancel}
                  >
                    Отменить
                  </button>
                  <button
                    onClick={() => onAction(event.id, 'edit')}
                    className={styles.edit}
                  >
                    Редактировать
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={classNames(styles.expandButton, {
            [styles.expanded]: isExpanded
          })}
        >
          {isExpanded ? 'Свернуть' : 'Подробнее'}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EventCard; 