import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/CalendarEventCard.module.scss';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'family' | 'kids' | 'outdoor' | 'indoor';
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const getTypeStyles = () => {
    switch (event.type) {
      case 'family':
        return styles.familyType;
      case 'kids':
        return styles.kidsType;
      case 'outdoor':
        return styles.outdoorType;
      case 'indoor':
        return styles.indoorType;
      default:
        return styles.familyType;
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={styles.eventCard}
    >
      <div className={styles.eventContent}>
        <div className={`${styles.typeIndicator} ${getTypeStyles()}`} />
        <div className={styles.eventInfo}>
          <h3>{event.title}</h3>
          <div className={styles.eventMeta}>
            <div className={styles.metaItem}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {event.time}
            </div>
            <div className={styles.metaItem}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {event.location}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard; 